import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the dataset
df = pd.read_csv('medical_dataset_real_diseases_only_10000.csv')

# Preprocessing: Convert ranges to training samples
np.random.seed(42)
df['Sample_Age'] = df.apply(lambda r: np.random.randint(r['Min_Age'], r['Max_Age']+1), axis=1)
df['Sample_Weight'] = df.apply(lambda r: np.random.uniform(r['Min_Weight'], r['Max_Weight']), axis=1)
df['Sample_BP'] = df.apply(lambda r: np.random.randint(r['Min_BP'], r['Max_BP']+1), axis=1)

# Initialize Encoders
encoders = {
    'Disease': LabelEncoder().fit(df['Disease']),
    'Medicine': LabelEncoder().fit(df['Medicine']),
    'Alcohol': LabelEncoder().fit(df['Alcohol_Consumption']),
    'Pregnant': LabelEncoder().fit(df['Pregnant']),
    'Blood_Group': LabelEncoder().fit(df['Blood_Group']),
    'Side_Effects': LabelEncoder().fit(df['Side_Effects'])
}

# Encode categorical data
df['D_Enc'] = encoders['Disease'].transform(df['Disease'])
df['M_Enc'] = encoders['Medicine'].transform(df['Medicine'])
df['A_Enc'] = encoders['Alcohol'].transform(df['Alcohol_Consumption'])
df['P_Enc'] = encoders['Pregnant'].transform(df['Pregnant'])
df['B_Enc'] = encoders['Blood_Group'].transform(df['Blood_Group'])
df['S_Enc'] = encoders['Side_Effects'].transform(df['Side_Effects'])

# Features: [Disease, Medicine, Age, Weight, BP, Alcohol, Pregnant, BloodGroup]
X = df[['D_Enc', 'M_Enc', 'Sample_Age', 'Sample_Weight', 'Sample_BP', 'A_Enc', 'P_Enc', 'B_Enc']]
y_eff = df['Effectiveness_1_10']
y_side = df['S_Enc']

# Train Models
m_eff = RandomForestRegressor(n_estimators=100).fit(X, y_eff)
m_side = RandomForestClassifier(n_estimators=100).fit(X, y_side)

# Save everything to one PKL file
model_package = {'m_eff': m_eff, 'm_side': m_side, 'encoders': encoders}
with open('medical_model.pkl', 'wb') as f:
    pickle.dump(model_package, f)

print("ML Model trained and saved as 'medical_model.pkl'.")