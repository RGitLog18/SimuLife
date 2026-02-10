import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def medical_recommendation_system(file_path):
    # Load the dataset
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        return "Error: Dataset file not found."

    # --- Side Effect Priority List ---
    priority_list = [
        "Vomiting", "Rash", "Diarrhea", "Nausea", 
        "Constipation", "Dizziness", "Sleepiness", 
        "Dry Mouth", "Fatigue", "None"
    ]

    print("--- SimuLife: Digital Twin Recommendation & Simulation ---")
    
    # 1. User Inputs
    target_disease = input("Enter the disease: ").strip()
    user_age = int(input("Enter your Age: "))
    user_weight = float(input("Enter your Weight (kg): "))
    user_bp = int(input("Enter your Systolic Blood Pressure (mmHg): "))
    user_alcohol = input("Alcohol? (Low/Moderate/Avoid): ").strip().capitalize()
    user_pregnant = input("Pregnant? (Yes/No): ").strip().capitalize()
    user_allergy = input("Allergies? (None/Food Allergy/Penicillin,Dust,None): ").strip()

    # Filter for the disease
    disease_meds = df[df['Disease'].str.lower() == target_disease.lower()]
    
    if disease_meds.empty:
        print(f"\nNo records found for {target_disease}.")
        return

    applicable_medicines = []
    unique_med_names = disease_meds['Medicine'].unique()
    
    for med in unique_med_names:
        med_variants = disease_meds[disease_meds['Medicine'] == med]
        for _, row in med_variants.iterrows():
            # Match constraints based on the NEW file column names
            cond_age = row['Min_Age'] <= user_age <= row['Max_Age']
            cond_weight = row['Min_Weight'] <= user_weight <= row['Max_Weight']
            cond_bp = row['Min_BP'] <= user_bp <= row['Max_BP']
            cond_preg = not (row['Pregnant'] == 'No' and user_pregnant == 'Yes')
            
            if all([cond_age, cond_weight, cond_bp, cond_preg]):
                se = row['Side_Effects']
                # Score based on priority (higher is better)
                priority_score = priority_list.index(se) if se in priority_list else 0
                
                applicable_medicines.append({
                    "Medicine": med,
                    "Side_Effects": se,
                    "Priority": priority_score,
                    "Base_Effectiveness": row['Effectiveness_1_10']
                })
                break 

    if not applicable_medicines:
        print("No applicable medicines found for your Digital Twin profile.")
        return

    # 2. Results & Best Choice
    applicable_medicines.sort(key=lambda x: x['Priority'], reverse=True)
    best_choice = applicable_medicines[0]

    print(f"\n--- Recommended for {target_disease} ---")
    for item in applicable_medicines:
        print(f"Medicine: {item['Medicine']} | Predicted Side Effect: {item['Side_Effects']}")

    print(f"\nRECOMMENDATION: {best_choice['Medicine']} (Priority: {best_choice['Side_Effects']})")

    # 3. Virtual Environment Simulation
    run_simulation(applicable_medicines, best_choice, target_disease)

def run_simulation(med_list, best_med, disease):
    """Simulates drug impact on a 'Digital Twin' using dosage curves."""
    doses = np.linspace(0, 100, 100)
    plt.figure(figsize=(12, 6))

    # Simulate Top 3 Recommended Meds
    for med in med_list[:3]:
        # Efficacy curve (Hill Equation)
        efficacy = (med['Base_Effectiveness'] * 10) * (doses / (40 + doses))
        # Side Effect Risk (Logistic curve)
        risk = 100 * (1 / (1 + np.exp(-0.15 * (doses - 70))))
        
        plt.plot(doses, efficacy, label=f"{med['Medicine']} - Efficacy")
        plt.plot(doses, risk, '--', alpha=0.5, label=f"{med['Medicine']} - Risk ({med['Side_Effects']})")

    plt.axvline(x=50, color='grey', linestyle=':', label='Standard Adult Dose')
    plt.title(f"Digital Twin Simulation for {disease}")
    plt.xlabel("Dosage (mg)")
    plt.ylabel("Percentage (%)")
    plt.legend()
    plt.grid(True)
    plt.show()

    print(f"\n--- Final Simulation Analysis for {best_med['Medicine']} ---")
    print(f"At 50mg, predicted Efficacy is {round(500/(40+50)*best_med['Base_Effectiveness'], 2)}%.")
    print(f"The risk of {best_med['Side_Effects']} remains below 20% up to 60mg.")

# Execution
medical_recommendation_system('medical_dataset_real_diseases_only_10000.csv')