import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
import os

def get_ml_recommendation():
    # 1. Load the PKL Model
    if not os.path.exists('medical_model.pkl'):
        print("Error: 'medical_model.pkl' not found. Please train the model first.")
        return

    with open('medical_model.pkl', 'rb') as f:
        data = pickle.load(f)
        m_eff, m_side, enc = data['m_eff'], data['m_side'], data['encoders']

    # 2. Ask User for Input
    print("\n--- SimuLife: Digital Twin ML Input ---")
    disease_input = input("Enter Disease (e.g., Chikungunya): ").strip()
    age = int(input("Enter Age: "))
    weight = float(input("Enter Weight (kg): "))
    bp = int(input("Enter Systolic Blood Pressure (mmHg): "))
    alcohol = input("Alcohol Consumption (Low/Moderate/Avoid): ").strip().capitalize()
    pregnant = input("Is the patient pregnant? (Yes/No): ").strip().capitalize()
    blood = input("Enter Blood Group (e.g., A+): ").strip().upper()

    # 3. Filter candidate medicines from dataset
    df = pd.read_csv('medical_dataset_real_diseases_only_10000.csv')
    possible_meds = df[df['Disease'].str.lower() == disease_input.lower()]['Medicine'].unique()
    
    if len(possible_meds) == 0:
        print(f"\nResult: No medicines found in the database for '{disease_input}'.")
        return

    predictions = []
    
    # 4. Process predictions for each medicine
    for med in possible_meds:
        try:
            # Build feature vector matching training columns
            feat = np.array([[
                enc['Disease'].transform([disease_input])[0],
                enc['Medicine'].transform([med])[0],
                age, weight, bp,
                enc['Alcohol'].transform([alcohol])[0],
                enc['Pregnant'].transform([pregnant])[0],
                enc['Blood_Group'].transform([blood])[0]
            ]])
            
            eff_score = m_eff.predict(feat)[0]
            side_idx = m_side.predict(feat)[0]
            side_effect = enc['Side_Effects'].inverse_transform([side_idx])[0]
            
            predictions.append({
                'Medicine': med, 
                'Effectiveness': eff_score, 
                'Side_Effect': side_effect
            })
        except Exception as e:
            # This catches cases where the user inputs a value not seen during training
            continue

    if not predictions:
        print("\nError: Could not process inputs. Ensure values (like Blood Group) are standard.")
        return

    # Sort and pick top recommendation
    predictions = sorted(predictions, key=lambda x: x['Effectiveness'], reverse=True)
    top_3 = predictions[:3]

    # 5. Generate Simulation Chart
    
    doses = np.linspace(0, 100, 100)
    plt.figure(figsize=(10, 5))
    
    for p in top_3:
        efficacy_curve = (p['Effectiveness'] * 10) * (doses / (40 + doses))
        plt.plot(doses, efficacy_curve, label=f"{p['Medicine']} (Eff: {p['Effectiveness']:.1f})")
    
    plt.axvline(x=50, color='red', linestyle='--', label='Standard 50mg Dose')
    plt.title(f"Digital Twin Simulation: {disease_input.capitalize()}")
    plt.xlabel("Dosage (mg)")
    plt.ylabel("Efficacy (%)")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    chart_name = f"sim_output_{disease_input.replace(' ', '_')}.png"
    plt.savefig(chart_name)
    plt.show() # Shows the chart immediately

    # Final Output
    print(f"\n" + "="*40)
    print(f"RECOMMENDED MEDICINE: {top_3[0]['Medicine']}")
    print(f"PREDICTED SIDE EFFECT: {top_3[0]['Side_Effect']}")
    print(f"ESTIMATED EFFICACY: {round(top_3[0]['Effectiveness'], 2)}/10")
    print(f"SIMULATION CHART SAVED AS: {chart_name}")
    print("="*40)

# Execute
if __name__ == "__main__":
    get_ml_recommendation()