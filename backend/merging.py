from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
import os

app = Flask(__name__, static_folder='static')
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Ensure static folder exists for charts
if not os.path.exists('static'):
    os.makedirs('static')

# Load model once at startup
try:
    with open('medical_model.pkl', 'rb') as f:
        model_data = pickle.load(f)
        m_eff = model_data['m_eff']
        m_side = model_data['m_side']
        enc = model_data['encoders']
    print("Model and Encoders loaded successfully.")
except Exception as e:
    print(f"Error loading model file: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        raw_disease = data.get('disease', '').strip()
        
        # Load dataset to find valid medicines for the disease
        df = pd.read_csv('medical_dataset_real_diseases_only_10000.csv')
        
        # 1. Case-insensitive search in the CSV
        matching_rows = df[df['Disease'].str.lower() == raw_disease.lower()]
        
        if matching_rows.empty:
            print(f"Error: Disease '{raw_disease}' not found in CSV")
            return jsonify({"error": f"Disease '{raw_disease}' not found"}), 404

        # Use the standard name from the CSV (important for the Encoder)
        disease_input = matching_rows.iloc[0]['Disease']
        possible_meds = matching_rows['Medicine'].unique()

        # 2. Define and Standardize categorical inputs to match Encoder training
        alcohol_input = data.get('alcohol', 'Low').capitalize()
        # Map common front-end values to CSV values
        if alcohol_input == "No": alcohol_input = "Avoid"
        if alcohol_input not in ['Low', 'Moderate', 'Avoid']: alcohol_input = 'Low'

        pregnant_input = data.get('pregnant', 'No').capitalize()
        if pregnant_input not in ['Yes', 'No']: pregnant_input = 'No'

        blood_input = str(data.get('blood', 'O+')).upper().strip()

        predictions = []
        for med in possible_meds:
            try:
                # 3. Create feature array for the model
                feat = np.array([[
                    enc['Disease'].transform([disease_input])[0],
                    enc['Medicine'].transform([med])[0],
                    int(data.get('age', 25)),
                    float(data.get('weight', 70)),
                    int(data.get('bp', 120)),
                    enc['Alcohol'].transform([alcohol_input])[0],
                    enc['Pregnant'].transform([pregnant_input])[0],
                    enc['Blood_Group'].transform([blood_input])[0]
                ]])
                
                # Predict scores
                eff_score = m_eff.predict(feat)[0]
                side_idx = m_side.predict(feat)[0]
                side_effect = enc['Side_Effects'].inverse_transform([side_idx])[0]
                
                predictions.append({
                    'Medicine': med, 
                    'Effectiveness': float(eff_score), 
                    'Side_Effect': side_effect
                })
            except Exception as e:
                print(f"Encoder Error for {med}: {e}")
                continue

        # 4. Handle Case where no predictions were successful
        if not predictions:
            return jsonify({"error": "Could not generate predictions for the given inputs"}), 500

        # Sort by effectiveness
        predictions = sorted(predictions, key=lambda x: x['Effectiveness'], reverse=True)
        top_3 = predictions[:3]

        # 5. Generate and save chart
        plt.figure(figsize=(10, 5))
        doses = np.linspace(0, 100, 100)
        for p in top_3:
            # Simple simulation curve: y = effectiveness * (doses / (saturation_constant + doses))
            y = (p['Effectiveness'] * 10) * (doses / (40 + doses))
            plt.plot(doses, y, label=f"{p['Medicine']}")
        
        plt.title(f"Effectiveness Simulation for {disease_input}")
        plt.xlabel("Dosage Intensity")
        plt.ylabel("Simulated Benefit Score")
        plt.legend()
        
        # Save plot to static folder
        safe_name = disease_input.replace(' ', '_').replace('/', '_')
        chart_name = f"sim_{safe_name}.png"
        static_path = os.path.join('static', chart_name)
        
        if os.path.exists(static_path):
            os.remove(static_path)
            
        plt.savefig(static_path)
        plt.close('all') 

        # 6. Return response
        return jsonify({
            "recommendation": top_3[0],
            "chart_url": f"http://localhost:5000/static/{chart_name}",
            "all_options": top_3
        })

    except Exception as e:
        print(f"Global Python Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)