import React, { useState, useEffect, useMemo } from 'react';

// --- IMAGE SOURCE CONSTANTS (RAW GITHUB LINKS FOR ACCURACY) ---
const LOGO_URL = "https://raw.githubusercontent.com/ha466/livelife/main/WhatsApp%20Image%202026-05-20%20at%202.42.43%20PM.jpeg";
const HERO_BG_URL = "https://raw.githubusercontent.com/ha466/livelife/main/WhatsApp%20Image%202026-05-20%20at%203.24.16%20PM.jpeg";

// --- DATASET FROM INFO.MD ---

const TESTS_DATA = [
  // Haematology
  { id: 't1', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'HB, TC, DC, ESR', nameTa: 'HB, TC, DC, ESR (இரத்த அணுக்கள் பரிசோதனை)', price: 150, prep: '12 hrs fasting', prepTa: '12 மணி நேரம் வெறும் வயிறு', desc: 'Basic blood counts including Haemoglobin, Total Counts, Differential Counts, and ESR.', descTa: 'ஹீமோகுளோபின், மொத்த அணுக்கள், வேறுபட்ட அணுக்கள் மற்றும் ESR உள்ளிட்ட அடிப்படை இரத்த அளவுகள்.' },
  { id: 't2', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'HB, TC, DC, PLC', nameTa: 'HB, TC, DC, PLC (இரத்த தட்டணுக்கள்)', price: 200, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Basic blood count along with Platelet evaluation.', descTa: 'தட்டணுக்கள் மதிப்பீட்டுடன் அடிப்படை இரத்த அணுக்கள் பரிசோதனை.' },
  { id: 't3', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'Complete Haemogram', nameTa: 'முழுமையான இரத்த அணுக்கள் பரிசோதனை (Complete Haemogram)', price: 300, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Detailed quantitative and qualitative assessment of red cells, white cells, and platelets.', descTa: 'சிவப்பு அணுக்கள், வெள்ளை அணுக்கள் மற்றும் தட்டணுக்களின் விரிவான அளவு மற்றும் தரமான மதிப்பீடு.' },
  { id: 't4', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'TC, PLC', nameTa: 'TC, PLC (மொத்த அணுக்கள் & தட்டணுக்கள்)', price: 150, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Total white blood cell count and platelet count.', descTa: 'மொத்த வெள்ளை இரத்த அணுக்கள் எண்ணிக்கை மற்றும் தட்டணுக்கள் எண்ணிக்கை.' },
  { id: 't5', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'Haemoglobin (Hb)', nameTa: 'ஹீமோகுளோபின் (Hb)', price: 50, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Measures the amount of oxygen-carrying protein in your blood.', descTa: 'இரத்தத்தில் ஆக்ஸிஜனை எடுத்துச் செல்லும் புரதத்தின் அளவை அளவிடுகிறது.' },
  { id: 't6', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'Platelet Count', nameTa: 'தட்டணுக்கள் எண்ணிக்கை (Platelet Count)', price: 100, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Calculates the density of platelets crucial for blood clotting.', descTa: 'இரத்த உறைதலுக்கு முக்கியமான தட்டணுக்களின் அடர்த்தியைக் கணக்கிடுகிறது.' },
  { id: 't7', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'ESR', nameTa: 'ESR (சிவப்பு அணுக்கள் படிதல் வீதம்)', price: 50, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Erythrocyte Sedimentation Rate to detect inflammation in the body.', descTa: 'உடலில் உள்ள வீக்கத்தைக் கண்டறியும் சிவப்பு அணுக்கள் படிதல் வீதம்.' },
  { id: 't8', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'Blood Group and Rh Typing', nameTa: 'இரத்த வகை கண்டறிதல் (Blood Group & Rh)', price: 50, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Determines ABO blood group and positive/negative Rh factor.', descTa: 'ABO இரத்த வகை மற்றும் Rh காரணியை (பாசிட்டிவ்/நெகட்டிவ்) தீர்மானிக்கிறது.' },
  { id: 't9', category: 'Haematology', categoryTa: 'இரத்தவியல்', name: 'Complete Haemogram + ESR + Smear Study', nameTa: 'Haemogram + ESR + தேய்ப்பு ஆய்வு', price: 450, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Comprehensive panel with complete cell analysis plus expert microscopic slide smear study.', descTa: 'முழுமையான செல் பகுப்பாய்வு மற்றும் நிபுணத்துவ நுண்ணோக்கி ஸ்லைடு தேய்ப்பு ஆய்வு கொண்ட விரிவான தொகுப்பு.' },

  // Urine Analysis
  { id: 't10', category: 'Urine Analysis', categoryTa: 'சிறுநீர் பரிசோதனை', name: 'Urine Complete (Manual & Strip)', nameTa: 'சிறுநீர் முழுமையான பரிசோதனை (Urine Complete)', price: 150, prep: 'First morning sample preferred', prepTa: 'காலை முதல் சிறுநீர் சிறந்தது', desc: 'Full physical, chemical, and microscopic check of urine.', descTa: 'சிறுநீரின் முழுமையான இயற்பியல், வேதியியல் மற்றும் நுண்ணோக்கி ஆய்வு.' },
  { id: 't11', category: 'Urine Analysis', categoryTa: 'சிறுநீர் பரிசோதனை', name: 'Microalbuminuria', nameTa: 'சிறுநீரில் நுண்புரதம் (Microalbuminuria)', price: 350, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Screening for early signs of kidney damage, crucial for diabetic patients.', descTa: 'சிறுநீரக பாதிப்பின் ஆரம்ப அறிகுறிகளைக் கண்டறிதல், நீரிழிவு நோயாளிகளுக்கு முக்கியமானது.' },
  { id: 't12', category: 'Urine Analysis', categoryTa: 'சிறுநீர் பரிசோதனை', name: 'Gravindex (Pregnancy Test)', nameTa: 'கர்ப்ப பரிசோதனை (Pregnancy Test)', price: 150, prep: 'First morning sample preferred', prepTa: 'காலை முதல் சிறுநீர் சிறந்தது', desc: 'Rapid immunological test for pregnancy detection.', descTa: 'கர்ப்பத்தை கண்டறிவதற்கான விரைவான நோயெதிர்ப்பு சோதனை.' },
  { id: 't13', category: 'Urine Analysis', categoryTa: 'சிறுநீர் பரிசோதனை', name: '24 Hrs Urine Protein', nameTa: '24 மணி நேர சிறுநீர் புரதம்', price: 350, prep: 'Requires 24-hour urine collection', prepTa: '24 மணி நேர சிறுநீர் சேகரிப்பு தேவை', desc: 'Measures protein excretion over 24 hours to check renal function.', descTa: 'சிறுநீரக செயல்பாட்டைச் சரிபார்க்க 24 மணி நேர புரத வெளியேற்றத்தை அளவிடுகிறது.' },

  // Biochemistry
  { id: 't14', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Lipid Profile', nameTa: 'கொழுப்பு அளவுகள் பரிசோதனை (Lipid Profile)', price: 300, prep: '12 hrs fasting', prepTa: '12 மணி நேரம் வெறும் வயிறு', desc: 'Evaluates cholesterol, triglycerides, HDL, LDL, and VLDL.', descTa: 'கொலஸ்ட்ரால், ட்ரைகிளிசரைடுகள், HDL, LDL மற்றும் VLDL ஆகியவற்றை மதிப்பிடுகிறது.' },
  { id: 't15', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Liver Function Tests (LFT)', nameTa: 'கல்லீரல் செயல்பாடு பரிசோதனை (LFT)', price: 520, prep: '12 hrs fasting preferred', prepTa: '12 மணி நேரம் வெறும் வயிறு சிறந்தது', desc: 'Measures bilirubin, SGOT, SGPT, ALP, and proteins to evaluate liver health.', descTa: 'கல்லீரல் ஆரோக்கியத்தை மதிப்பிட பிலிரூபின், SGOT, SGPT, ALP மற்றும் புரதங்களை அளவிடுகிறது.' },
  { id: 't16', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Blood Glucose (Single)', nameTa: 'இரத்த சர்க்கரை (Blood Glucose)', price: 40, prep: 'Fasting or Post Prandial', prepTa: 'வெறும் வயிறு அல்லது உணவுக்கு பின்', desc: 'Single check of blood sugar level (Fasting / PP / Random).', descTa: 'இரத்த சர்க்கரை அளவை ஒற்றை முறை சரிபார்த்தல்.' },
  { id: 't17', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'HbA1C', nameTa: '3 மாத சர்க்கரை அளவு (HbA1C)', price: 400, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Gives average blood sugar levels over the past 3 months.', descTa: 'கடந்த 3 மாதங்களில் சராசரி இரத்த சர்க்கரை அளவைக் காட்டுகிறது.' },
  { id: 't18', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Serum Creatinine', nameTa: 'கிரியேட்டினின் (Serum Creatinine)', price: 100, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Essential check for kidney filtering function.', descTa: 'சிறுநீரக வடிகட்டுதல் செயல்பாட்டிற்கான அத்தியாவசிய பரிசோதனை.' },
  { id: 't19', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Blood Urea', nameTa: 'யுரியா (Blood Urea)', price: 100, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Measures nitrogen content in blood from urea, evaluating kidneys.', descTa: 'சிறுநீரகங்களை மதிப்பிட இரத்தத்தில் உள்ள யூரியா நைட்ரஜனை அளவிடுகிறது.' },
  { id: 't20', category: 'Biochemistry', categoryTa: 'உயிர் வேதியியல்', name: 'Serum Uric Acid', nameTa: 'யூரிக் அமிலம் (Serum Uric Acid)', price: 150, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Detects high uric acid, useful for joint pain and gout diagnosis.', descTa: 'அதிக யூரிக் அமிலத்தைக் கண்டறிகிறது, மூட்டு வலி மற்றும் கவுட் நோயைக் கண்டறிய உதவுகிறது.' },

  // Electrolytes
  { id: 't21', category: 'Electrolytes', categoryTa: 'தாது உப்புக்கள்', name: 'Electrolytes Complete', nameTa: 'முழுமையான தாது உப்புக்கள் (Electrolytes)', price: 650, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Measures Sodium, Potassium, Chloride, Bicarbonate, Calcium, and Phosphorus.', descTa: 'சோடியம், பொட்டாசியம், குளோரைடு, பைகார்பனேட், கால்சியம் மற்றும் பாஸ்பரஸ் ஆகியவற்றை அளவிடுகிறது.' },
  { id: 't22', category: 'Electrolytes', categoryTa: 'தாது உப்புக்கள்', name: 'Sodium', nameTa: 'சோடியம் (Sodium)', price: 150, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Monitors fluid balance and neurological system.', descTa: 'திரவ சமநிலை மற்றும் நரம்பியல் அமைப்பைக் கண்காணிக்கிறது.' },
  { id: 't23', category: 'Electrolytes', categoryTa: 'தாது உப்புக்கள்', name: 'Potassium', nameTa: 'பொட்டாசியம் (Potassium)', price: 150, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Critical for cardiac and muscular performance.', descTa: 'இதயம் மற்றும் தசை செயல்பாட்டிற்கு முக்கியமானது.' },

  // Serology
  { id: 't24', category: 'Serology / Immunology', categoryTa: 'செரோலஜி / நோயெதிர்ப்பு', name: 'WIDAL - Slide Technique', nameTa: 'டைபாய்டு காய்ச்சல் பரிசோதனை (WIDAL)', price: 150, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Standard screening test for Typhoid fever.', descTa: 'டைபாய்டு காய்ச்சலுக்கான நிலையான பரிசோதனை.' },
  { id: 't25', category: 'Serology / Immunology', categoryTa: 'செரோலஜி / நோயெதிர்ப்பு', name: 'CRP (C Reactive Protein)', nameTa: 'சி-ரியாக்டிவ் புரோட்டீன் (CRP)', price: 400, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Measures inflammatory levels in blood stream.', descTa: 'இரத்த ஓட்டத்தில் வீக்கத்தின் அளவை அளவிடுகிறது.' },
  { id: 't26', category: 'Serology / Immunology', categoryTa: 'செரோலஜி / நோயெதிர்ப்பு', name: 'HIV', nameTa: 'எச்.ஐ.வி பரிசோதனை (HIV)', price: 400, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Screening for Human Immunodeficiency Virus.', descTa: 'மனித நோய் எதிர்ப்பு குறைபாடு வைரஸிற்கான பரிசோதனை.' },
  { id: 't27', category: 'Serology / Immunology', categoryTa: 'செரோலஜி / நோயெதிர்ப்பு', name: 'HBsAg', nameTa: 'மஞ்சள் காமாலை பி வகை (HBsAg)', price: 300, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Hepatitis B Surface Antigen screening.', descTa: 'ஹெபடைடிஸ் பி வைரஸ் தொற்றைக் கண்டறியும் பரிசோதனை.' },
  { id: 't28', category: 'Serology / Immunology', categoryTa: 'செரோலஜி / நோயெதிர்ப்பு', name: 'Dengue NS1, IgG, IgM', nameTa: 'டெங்கு காய்ச்சல் பரிசோதனை (Dengue)', price: 800, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Full dengue profile checking active antigen and antibodies.', descTa: 'டெங்கு தொற்றின் தற்போதைய மற்றும் முந்தைய பாதிப்பை சரிபார்க்கும் முழுமையான சுயவிவரம்.' },

  // Thyroid / Hormones
  { id: 't29', category: 'Thyroid & Hormones', categoryTa: 'தைராய்டு & ஹார்மோன்', name: 'TFT (T3, T4, TSH)', nameTa: 'முழுமையான தைராய்டு பரிசோதனை (TFT)', price: 480, prep: 'Morning fasting preferred', prepTa: 'காலை வெறும் வயிறு சிறந்தது', desc: 'Basic thyroid gland monitoring panel (T3, T4, TSH).', descTa: 'தைராய்டு சுரப்பியின் அடிப்படை கண்காணிப்பு தொகுப்பு (T3, T4, TSH).' },
  { id: 't30', category: 'Thyroid & Hormones', categoryTa: 'தைராய்டு & ஹார்மோன்', name: 'TSH', nameTa: 'தைராய்டு தூண்டுதல் ஹார்மோன் (TSH)', price: 280, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Thyroid Stimulating Hormone check, standard thyroid screening.', descTa: 'தைராய்டு தூண்டுதல் ஹார்மோன் சரிபார்ப்பு, நிலையான தைராய்டு திரையிடல்.' },
  { id: 't31', category: 'Thyroid & Hormones', categoryTa: 'தைராய்டு & ஹார்மோன்', name: 'Vit B12', nameTa: 'வைட்டமின் பி12 (Vitamin B12)', price: 1000, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Assesses vitamin levels critical for nerve function and blood cells.', descTa: 'நரம்பு செயல்பாடு மற்றும் இரத்த அணுக்களுக்கு முக்கியமான வைட்டமின் அளவை மதிப்பிடுகிறது.' },
  { id: 't32', category: 'Thyroid & Hormones', categoryTa: 'தைராய்டு & ஹார்மோன்', name: 'Vit D3', nameTa: 'வைட்டமின் டி3 (Vitamin D3)', price: 1200, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Essential for bone density, immune health, and calcium absorption.', descTa: 'எலும்பு அடர்த்தி, நோய் எதிர்ப்பு சக்தி மற்றும் கால்சியம் உறிஞ்சுதலுக்கு அத்தியாவசியமானது.' },
  { id: 't33', category: 'Thyroid & Hormones', categoryTa: 'தைராய்டு & ஹார்மோன்', name: 'PSA', nameTa: 'புரோஸ்டேட் பரிசோதனை (PSA for Men)', price: 580, prep: 'None', prepTa: 'தேவையில்லை', desc: 'Prostate Specific Antigen screening for prostate health in men.', descTa: 'ஆண்களுக்கான புரோஸ்டேட் சுரப்பி ஆரோக்கியத்தை கண்டறியும் பரிசோதனை.' }
];

const PACKAGES_DATA = [
  {
    id: 'p1',
    name: 'Mini Health Package',
    nameTa: 'மினி ஹெல்த் பேக்கேஜ்',
    testsCount: 61,
    mrp: 1200,
    offerPrice: 650,
    savings: 550,
    popular: false,
    prep: '12 Hours Fasting',
    prepTa: '12 மணி நேர உபவாசம் தேவை',
    includes: [
      'Complete Blood Count (24 tests: Hb, WBC, Platelets, etc.)',
      'Diabetes: Glucose Fasting (1 test)',
      'Kidney Function Tests (7 tests: Urea, Creatinine, Uric Acid, etc.)',
      'Lipid Profile (9 tests: Cholesterol, Triglycerides, HDL, LDL, etc.)',
      'Urine Complete Analysis (20 parameters: Colour, pH, Sugar, Protein, etc.)'
    ],
    includesTa: [
      'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை (24 பரிசோதனைகள்: Hb, WBC, தட்டணுக்கள்)',
      'நீரிழிவு: வெறும் வயிற்று சர்க்கரை அளவு (1 பரிசோதனை)',
      'சிறுநீரக செயல்பாடு பரிசோதனைகள் (7 பரிசோதனைகள்: யூரியா, கிரியேட்டினின், யூரிக் அமிலம்)',
      'கொழுப்பு சுயவிவரம் (9 பரிசோதனைகள்: கொலஸ்ட்ரால், ட்ரைகிளிசரைடுகள், HDL, LDL)',
      'சிறுநீர் முழுமையான பகுப்பாய்வு (20 அளவீடுகள்: நிறம், pH, சர்க்கரை, புரதம்)'
    ]
  },
  {
    id: 'p2',
    name: 'Basic Health Package',
    nameTa: 'பேசிக் ஹெல்த் பேக்கேஜ்',
    testsCount: 79,
    mrp: 3200,
    offerPrice: 1600,
    savings: 1600,
    popular: false,
    prep: '12 Hours Fasting',
    prepTa: '12 மணி நேர உபவாசம் தேவை',
    includes: [
      'Complete Blood Count (24 tests)',
      'Diabetic Status (2 tests: Glucose Fasting, HbA1C)',
      'Lipid Profile (9 tests)',
      'Kidney Function Tests (7 tests)',
      'Liver Function Tests (12 tests: Bilirubin, AST, ALT, GGT, Proteins, ALP)',
      'Electrolytes (3 tests: Sodium, Potassium, Chloride)',
      'Bone Health (2 tests: Calcium, Phosphorus)',
      'Urine Complete Analysis (20 parameters)'
    ],
    includesTa: [
      'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை (24 பரிசோதனைகள்)',
      'நீரிழிவு நிலை (2 பரிசோதனைகள்: வெறும் வயிற்று சர்க்கரை, HbA1C)',
      'கொழுப்பு சுயவிவரம் (9 பரிசோதனைகள்)',
      'சிறுநீரக செயல்பாடு பரிசோதனைகள் (7 பரிசோதனைகள்)',
      'கல்லீரல் செயல்பாடு பரிசோதனைகள் (12 பரிசோதனைகள்: பிலிரூபின், AST, ALT, புரதங்கள்)',
      'தாது உப்புக்கள் (3 பரிசோதனைகள்: சோடியம், பொட்டாசியம், குளோரைடு)',
      'எலும்பு ஆரோக்கியம் (2 பரிசோதனைகள்: கால்சியம், பாஸ்பரஸ்)',
      'சிறுநீர் முழுமையான பகுப்பாய்வு (20 அளவீடுகள்)'
    ]
  },
  {
    id: 'p3',
    name: 'Regular Health Package',
    nameTa: 'ரெகுலர் ஹெல்த் பேக்கேஜ்',
    testsCount: 87,
    mrp: 4500,
    offerPrice: 2000,
    savings: 2500,
    popular: true, // Most popular ribbon
    prep: '12 Hours Fasting',
    prepTa: '12 மணி நேர உபவாசம் தேவை',
    includes: [
      'Complete Blood Count (24 tests)',
      'Diabetic Profile (2 tests: Glucose Fasting, HbA1C)',
      'Lipid Profile (9 tests)',
      'Kidney Function Tests (7 tests)',
      'Liver Function Tests (12 tests)',
      'Electrolytes (3 tests)',
      'Bone Health (2 tests)',
      'Thyroid Function Tests (3 tests: T3, T4, TSH)',
      'Iron Profile (4 tests: Iron, UIBC, TIBC, Transferrin)',
      'Tumor Marker (1 test: PSA for Men / CA-125 for Women)',
      'Urine Complete Analysis (20 parameters)'
    ],
    includesTa: [
      'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை (24 பரிசோதனைகள்)',
      'நீரிழிவு சுயவிவரம் (2 பரிசோதனைகள்: சர்க்கரை, HbA1C)',
      'கொழுப்பு சுயவிவரம் (9 பரிசோதனைகள்)',
      'சிறுநீரக செயல்பாடு பரிசோதனைகள் (7 பரிசோதனைகள்)',
      'கல்லீரல் செயல்பாடு பரிசோதனைகள் (12 பரிசோதனைகள்)',
      'தாது உப்புக்கள் (3 பரிசோதனைகள்)',
      'எலும்பு ஆரோக்கியம் (2 பரிசோதனைகள்)',
      'தைராய்டு செயல்பாடு (3 பரிசோதனைகள்: T3, T4, TSH)',
      'இரும்புச்சத்து சுயவிவரம் (4 பரிசோதனைகள்: இரும்பு, TIBC, டிரான்ஸ்ஃபெரின்)',
      'புற்றுநோய் அறிகுறி (1 பரிசோதனை: ஆண்களுக்கு PSA / பெண்களுக்கு CA-125)',
      'சிறுநீர் முழுமையான பகுப்பாய்வு (20 அளவீடுகள்)'
    ]
  },
  {
    id: 'p4',
    name: 'Executive Health Package',
    nameTa: 'எக்ஸிகியூட்டிவ் ஹெல்த் பேக்கேஜ்',
    testsCount: 89,
    mrp: 5200,
    offerPrice: 2500,
    savings: 2700,
    popular: false,
    prep: '12 Hours Fasting',
    prepTa: '12 மணி நேர உபவாசம் தேவை',
    includes: [
      'Complete Blood Count (24 tests)',
      'Diabetic Profile (2 tests: Glucose Fasting, HbA1C)',
      'Lipid Profile (9 tests)',
      'Kidney Function Tests (7 tests)',
      'Liver Function Tests (12 tests)',
      'Electrolytes (3 tests)',
      'Bone Health (2 tests)',
      'Thyroid Function Tests (3 tests)',
      'Vitamins Panel (2 tests: Vitamin D3, Vitamin B12)',
      'Iron Profile (4 tests)',
      'Tumor Marker (1 test: PSA for Men / CA-125 for Women)',
      'Urine Complete Analysis (20 parameters)'
    ],
    includesTa: [
      'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை (24 பரிசோதனைகள்)',
      'நீரிழிவு சுயவிவரம் (2 பரிசோதனைகள்: சர்க்கரை, HbA1C)',
      'கொழுப்பு சுயவிவரம் (9 பரிசோதனைகள்)',
      'சிறுநீரக செயல்பாடு பரிசோதனைகள் (7 பரிசோதனைகள்)',
      'கல்லீரல் செயல்பாடு பரிசோதனைகள் (12 பரிசோதனைகள்)',
      'தாது உப்புக்கள் (3 பரிசோதனைகள்)',
      'எலும்பு ஆரோக்கியம் (2 பரிசோதனைகள்)',
      'தைராய்டு செயல்பாடு (3 பரிசோதனைகள்: T3, T4, TSH)',
      'வைட்டமின்கள் தொகுப்பு (2 பரிசோதனைகள்: வைட்டமின் D3, வைட்டமின் B12)',
      'இரும்புச்சத்து சுயவிவரம் (4 பரிசோதனைகள்)',
      'புற்றுநோய் அறிகுறி (1 பரிசோதனை: ஆண்களுக்கு PSA / பெண்களுக்கு CA-125)',
      'சிறுநீர் முழுமையான பகுப்பாய்வு (20 அளவீடுகள்)'
    ]
  },
  {
    id: 'p5',
    name: 'Premium Health Package',
    nameTa: 'பிரிமியம் ஹெல்த் பேக்கேஜ்',
    testsCount: 96,
    mrp: 7300,
    offerPrice: 3100,
    savings: 4200,
    popular: false,
    prep: '12 Hours Fasting Required',
    prepTa: '12 மணி நேர உபவாசம் கண்டிப்பாக தேவை',
    includes: [
      'Complete Blood Count (24 tests)',
      'Diabetic Profile (2 tests)',
      'Lipid Profile (9 tests)',
      'Kidney Function Tests (7 tests)',
      'Liver Function Tests (12 tests)',
      'Electrolytes (3 tests)',
      'Bone & Joint Health (2 tests: Calcium, Phosphorus)',
      'Pancreatic Profile (2 tests: Amylase, Lipase)',
      'Cardiac Markers Panel (6 tests: Apo A1, Apo B, Lipoprotein(a), Homocysteine, hs-CRP, Apo Ratio)',
      'Thyroid Function Tests (3 tests)',
      'Vitamins Panel (2 tests: Vitamin D3, Vitamin B12)',
      'Iron Profile (4 tests)',
      'Tumor Marker (1 test: PSA for Men / CA-125 for Women)',
      'Urine Complete Analysis (20 parameters)'
    ],
    includesTa: [
      'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை (24 பரிசோதனைகள்)',
      'நீரிழிவு சுயவிவரம் (2 பரிசோதனைகள்)',
      'கொழுப்பு சுயவிவரம் (9 பரிசோதனைகள்)',
      'சிறுநீரக செயல்பாடு பரிசோதனைகள் (7 பரிசோதனைகள்)',
      'கல்லீரல் செயல்பாடு பரிசோதனைகள் (12 பரிசோதனைகள்)',
      'தாது உப்புக்கள் (3 பரிசோதனைகள்)',
      'எலும்பு ஆரோக்கியம் (2 பரிசோதனைகள்: கால்சியம், பாஸ்பரஸ்)',
      'கணைய சுயவிவரம் (2 பரிசோதனைகள்: அமிலேஸ், லிபேஸ்)',
      'இதய நோய்க்கான காரணிகள் (6 பரிசோதனைகள்: ஹோமோசிஸ்டைன், hs-CRP, அப்போபுரோட்டீன் போன்றவை)',
      'தைராய்டு செயல்பாடு (3 பரிசோதனைகள்)',
      'வைட்டமின்கள் தொகுப்பு (2 பரிசோதனைகள்: வைட்டமின் D3, B12)',
      'இரும்புச்சத்து சுயவிவரம் (4 பரிசோதனைகள்)',
      'புற்றுநோய் அறிகுறி (1 பரிசோதனை: ஆண்களுக்கு PSA / பெண்களுக்கு CA-125)',
      'சிறுநீர் முழுமையான பகுப்பாய்வு (20 அளவீடுகள்)'
    ]
  },
  {
    id: 'p6',
    name: 'Diabetes Essential Panel',
    nameTa: 'நீரிழிவு அத்தியாவசிய பரிசோதனை',
    testsCount: 10,
    mrp: 1000,
    offerPrice: 550,
    savings: 450,
    popular: false,
    prep: '12 Hours Fasting Advice',
    prepTa: '12 மணி நேர உபவாசம் சிறந்தது (3 மாதத்திற்கு ஒருமுறை சிறந்தது)',
    includes: [
      'Fasting Blood Sugar (FBS)',
      'Post Prandial Blood Sugar (PPBS)',
      'HbA1C (3 Month Average)',
      'Blood Urea',
      'Serum Creatinine',
      'Triglycerides Test',
      'Blood Urea Nitrogen (BUN)',
      'eGFR (Kidney Filtration Rate)'
    ],
    includesTa: [
      'வெறும் வயிற்று சர்க்கரை (FBS)',
      'உணவுக்கு பின் சர்க்கரை (PPBS)',
      'HbA1C (3 மாத சராசரி சர்க்கரை)',
      'இரத்த யூரியா (Blood Urea)',
      'சீரம் கிரியேட்டினின்',
      'ட்ரைகிளிசரைடுகள் கொழுப்பு',
      'இரத்த யூரியா நைட்ரஜன் (BUN)',
      'eGFR (சிறுநீரக வடிகட்டுதல் வீதம்)'
    ]
  },
  {
    id: 'p7',
    name: 'Diabetes Advanced Panel',
    nameTa: 'நீரிழிவு அதிநவீன பரிசோதனை',
    testsCount: 20,
    mrp: 1200,
    offerPrice: 899,
    savings: 301,
    popular: false,
    prep: '12 Hours Fasting Required',
    prepTa: '12 மணி நேர உபவாசம் தேவை',
    includes: [
      'Fasting Blood Sugar (FBS)',
      'Post Prandial Blood Sugar (PPBS)',
      'Full Lipid Profile (9 tests)',
      'HbA1C (3 Month Average Check)',
      'Serum Creatinine',
      'Blood Urea',
      'BUN (Blood Urea Nitrogen)',
      'eGFR Estimation'
    ],
    includesTa: [
      'வெறும் வயிற்று சர்க்கரை (FBS)',
      'உணவுக்கு பின் சர்க்கரை (PPBS)',
      'முழு கொழுப்பு அளவுகள் (9 பரிசோதனைகள்)',
      'HbA1C (3 மாத சராசரி)',
      'சீரம் கிரியேட்டினின்',
      'இரத்த யூரியா',
      'இரத்த யூரியா நைட்ரஜன் (BUN)',
      'eGFR சிறுநீரக கணிப்பு'
    ]
  }
];

// FAQ Content
const FAQS_DATA = [
  { id: 'faq1', q: "What is the lab's location?", qTa: "ஆய்வகம் எங்கு அமைந்துள்ளது?", a: "14, Aarthi Complex, Lakshmi Thirumana Mandapam Opposite, Anushm Theatre, Kizhpuram, Udumalaipettai 642126.", aTa: "14, ஆர்த்தி காம்ப்ளக்ஸ், லட்சுமி திருமண மண்டபம் எதிர்புறம், அனுஷம் தியேட்டர், கிழபுரம், உடுமலைப்பேட்டை 642126." },
  { id: 'faq2', q: "Is the lab open 24 hours?", qTa: "ஆய்வகம் 24 மணி நேரமும் திறந்திருக்குமா?", a: "Yes. The laboratory operates 24 hours a day, 7 days a week.", aTa: "ஆம். எங்களது ஆய்வகம் வாரத்தின் 7 நாட்களும், 24 மணி நேரமும் செயல்படுகிறது." },
  { id: 'faq3', q: "Do you offer home sample collection?", qTa: "வீட்டிற்கே வந்து மாதிரி எடுக்கும் வசதி உள்ளதா?", a: "Yes. We offer free home sample collection. Call any of our numbers to book: 9751504558, 9751744558, or 8190004558.", aTa: "ஆம். நாங்கள் கட்டணமில்லா வீட்டிற்கே வந்து மாதிரி எடுக்கும் சேவையை வழங்குகிறோம். முன்பதிவு செய்ய எங்களை தொடர்பு கொள்ளவும்: 9751504558, 9751744558, 8190004558." },
  { id: 'faq4', q: "How long does it take to receive results?", qTa: "பரிசோதனை முடிவுகள் வர எவ்வளவு நேரம் ஆகும்?", a: "Most routine tests (sugar, blood count) are completed within a few hours. Advanced hormone assays or cultures may take longer.", aTa: "பெரும்பாலான வழக்கமான பரிசோதனைகள் (சர்க்கரை, இரத்த எண்ணிக்கை) சில மணிநேரங்களில் முடிவடையும். மேம்பட்ட தைராய்டு அல்லது கல்ச்சர் பரிசோதனைகளுக்கு கூடுதல் நேரம் ஆகலாம்." },
  { id: 'faq5', q: "Are the tests done on automated machines?", qTa: "பரிசோதனைகள் தானியங்கி இயந்திரங்கள் மூலம் செய்யப்படுகிறதா?", a: "Yes. All biochemical tests are processed on a Fully Computerised Auto Analyser and Fully Automated Cell Counter for maximum accuracy.", aTa: "ஆம். அனைத்து உயிர்வேதியியல் பரிசோதனைகளும் துல்லியமான முடிவுகளுக்காக முழு கணினிமயமாக்கப்பட்ட ஆட்டோ அனலைசர் மற்றும் தானியங்கி செல் கவுண்டர் மூலம் செயலாக்கப்படுகின்றன." },
  { id: 'faq6', q: "Is the lab certified / accredited?", qTa: "ஆய்வகம் சான்றளிக்கப்பட்டுள்ளதா?", a: "Yes. The lab participates in the prestigious CMC Quality Centre Programme, Vellore, ensuring standardized testing quality.", aTa: "ஆம். எங்களது ஆய்வகம் புகழ்பெற்ற வெல்லூர் சி.எம்.சி தரக்கட்டுப்பாட்டு திட்டத்தில் (CMC Quality Programme) பங்கேற்று, தரமான முடிவுகளை உறுதி செய்கிறது." },
  { id: 'faq7', q: "How long should I fast before a blood test?", qTa: "இரத்த பரிசோதனைக்கு முன்பு நான் எவ்வளவு நேரம் உண்ணாமல் இருக்க வேண்டும்?", a: "12 hours of fasting is highly recommended for most health checkups, diabetic fasting checks, and lipid profile tests. You can drink plain water.", aTa: "பொதுவான உடல் பரிசோதனை, சர்க்கரை மற்றும் கொழுப்பு பரிசோதனைகளுக்கு 12 மணி நேர உபவாசம் (வெறும் வயிறு) மிகவும் அவசியம். நீங்கள் சாதாரண தண்ணீர் குடிக்கலாம்." },
  { id: 'faq8', q: "Do you offer special packages for diabetes patients?", qTa: "நீரிழிவு நோயாளிகளுக்கு சிறப்பு தொகுப்புகள் ஏதேனும் உள்ளதா?", a: "Yes. We have Diabetes Essential (₹550) and Diabetes Advanced (₹899) panels, recommended for regular checkups every 3 months.", aTa: "ஆம். எங்களிடம் நீரிழிவு நோயாளிகளுக்காக 'நீரிழிவு அத்தியாவசியம்' (₹550) மற்றும் 'நீரிழிவு அதிநவீன' (₹899) பேக்கேஜ்கள் உள்ளன. இதை 3 மாதங்களுக்கு ஒருமுறை பரிசோதிக்க அறிவுறுத்தப்படுகிறது." }
];

// --- TRANSLATION MAPS ---

const TRANSLATIONS = {
  en: {
    title: 'Live Life Healthcare Lab',
    tagline: 'Quality Laboratory Services',
    home_collection_badge: 'Free Home Collection',
    phone_title: 'Need Help? Call Us Support 24/7',
    working_hours: 'Lab Facility: 24 Hours | 7 Days a Week',
    cmc_certified: 'CMC Quality Centre Certified',
    nav_home: 'Home',
    nav_tests: 'Tests & Packages',
    nav_about: 'About Us',
    nav_appointments: 'Book Appointment',
    nav_faq: 'FAQs',
    nav_contact: 'Contact Us',
    nav_resources: 'Patient Guide',
    hero_badge: 'CMC Quality Assurance Certified Centre',
    hero_title: 'Trusted Diagnostic Laboratory Services',
    hero_subtitle: 'Accurate, Affordable, Patient-First Pathology and Blood Tests in Udumalaipettai.',
    hero_cta_book: 'Book Appointment Now',
    hero_cta_tests: 'View Test Price List',
    hero_stat_automated: '100% Fully Automated',
    hero_stat_home: 'Free Home Collection',
    hero_stat_hours: '24/7 Clinical Support',
    stat_lab_open: 'Lab Facility open 24 Hours',
    stat_contact_nums: '3 Primary Help Lines',
    stat_test_count: '96+ Tests in Top Package',
    stat_auto_system: 'Fully Automated Lab',
    about_brief_h2: 'About Live Life Healthcare Lab',
    about_brief_p1: 'Live Life Healthcare Lab is a premier diagnostic centre located in Udumalaipettai, Tamil Nadu. Established and managed by S. SatheeshKumar (DMLT., DXT.), we are dedicated to delivering highly precise clinical test reports using elite computerized laboratory gear.',
    about_brief_p2: 'As a participant in the prestigious CMC Quality Centre Programme, our lab is recognized for its stringent accuracy guidelines. From routine blood counts to complex hormonal evaluations, our patient-oriented care promises safety and comfort.',
    about_owner_badge: 'Chief Lab Operator & Director',
    about_learn_more: 'Learn More About Our Tech',
    services_h2: 'Our Specialised Laboratory Services',
    services_subtitle: 'We employ state-of-the-art computerised instrumentation to process biochemical and pathological assays.',
    service1_title: 'Haematology Tests',
    service1_desc: 'Complete cell profiling, counts, platelets, and peripheral slide studies utilizing automatic cell counters.',
    service2_title: 'Biochemistry Panels',
    service2_desc: 'Assessment of key biomarkers, electrolytes, sugar monitoring, liver profile, and renal health indices.',
    service3_title: 'Thyroid & Hormones',
    service3_desc: 'Advanced hormonal analyses including precise T3, T4, TSH assays and critical vitamins.',
    service4_title: 'Diabetes Management',
    service4_desc: 'HbA1C three-month average glucose monitoring and customized diabetic panels.',
    service5_title: 'Liver & Kidney Profiles',
    service5_desc: 'Comprehensive panel analysis ensuring hepatic and renal safety indices are operating optimally.',
    service6_title: 'Custom Health Packages',
    service6_desc: 'Pre-surgery profiles, mini-screenings, master health panels, and bespoke full body checks.',
    packages_h2: 'Our Preventive Health Packages',
    packages_subtitle: 'Excellent comprehensive screenings that are easy on your pocket. Prioritize prevention today!',
    package_popular: 'MOST POPULAR',
    package_mrp: 'Original MRP',
    package_offer: 'Special Offer Price',
    package_save: 'You Save',
    package_btn_details: 'View Test Breakdown',
    package_btn_book: 'Pre-book Now',
    why_h2: 'Why Live Life Healthcare Lab is the Trusted Choice',
    why_1_title: '24-Hour Availability',
    why_1_desc: 'Urgent pathology tests, critical trauma panels, and round-the-clock supportive technician presence.',
    why_2_title: 'Free Home Sampling',
    why_2_desc: 'We send a trained, hygienic phlebotomist directly to collect blood samples comfortably at your home.',
    why_3_title: 'CMC Vellore Program',
    why_3_desc: 'Our processes participate in national testing standardization programmes for supreme medical safety.',
    why_4_title: 'Fully Computerised',
    why_4_desc: 'Minimal human error. Direct digital interface testing via our computerised auto analysers.',
    diabetes_special_h2: 'Special Diabetes Monitoring Panels',
    diabetes_special_subtitle: 'Advised by clinicians every 3 months to inspect vascular and renal wellness in diabetic patients.',
    diabetes_special_cta: 'Book Diabetes Panel',
    contact_strip_title: 'Need a Fast Home Sample Collection?',
    contact_strip_desc: 'Call any of our certified dispatch phone numbers. Our team is ready to assist you right now.',
    footer_addr_label: 'Main Laboratory Address:',
    footer_cert_label: 'Certified Participant:',
    footer_rights: 'All Rights Reserved. Valid for 2026-2027.',
    search_placeholder: 'Search for blood tests, hormones, sugar profiles, prices...',
    filter_all: 'All Departments',
    test_prep_label: 'Preparation Required:',
    test_price_label: 'Testing Cost:',
    add_to_booking: 'Add to Booking List',
    remove_from_booking: 'Remove from Booking',
    booking_calculator_title: 'Interactive Appointment Estimator',
    booking_selected_count: 'selected test(s)/package(s)',
    booking_total_mrp: 'Combined Cost',
    booking_total_saved: 'Total Money Saved',
    booking_final_total: 'Final Amount to Pay',
    booking_proceed_btn: 'Proceed to Schedule Appointment',
    about_page_hero: 'Pioneering Diagnostics with a Caring Touch',
    about_story_h3: 'Our Story & Philosophy',
    about_story_p1: 'Live Life Healthcare Lab was established in Udumalaipettai with a clear-cut purpose: to make pathology diagnostic testing transparent, quick, and universally affordable. S. SatheeshKumar envisioned an automated setup where every local patient has access to Vellore-standard verification.',
    about_story_p2: 'Today, we stand as Udumalaipettai’s dependable 24/7 destination. Whether it is an early-morning fasting check for an elderly grandfather or an emergency cardiac test in the middle of the night, our automated system guarantees reliability.',
    about_tech_h3: 'Our Gold Standard Automated Infrastructure',
    about_tech_desc: 'We refuse to compromise on quality. Our clinical setup features a Fully Automated Cell Counter and Computerised Auto Analysers, eliminating manual dilutions and ensuring standard clinical precision.',
    about_values_h3: 'Our Mission & Vision',
    about_value_mission_title: 'Our Mission',
    about_value_mission_p: 'To offer affordable, highly accurate diagnostic analysis to every home in Udumalaipettai, powered by modern lab automation and polite care.',
    about_value_vision_title: 'Our Vision',
    about_value_vision_p: 'To be recognized as the premier pathology center in Tamil Nadu, merging elite technical parameters with affordable citizen welfare.',
    appt_h2: 'Schedule an Appointment',
    appt_desc: 'Fill out this simple scheduling form. We will coordinate your walk-in slot or send a phlebotomist to your address for free home sample collection.',
    appt_info_title: 'Important Preparation Rules',
    appt_info_rule1: 'Fasting: A 12-hour fast is strictly recommended for Blood Sugar, Lipids, and Whole Body Packages. You can drink water.',
    appt_info_rule2: 'Timing: Morning collection (6:00 AM to 10:00 AM) yields optimal clinical results for thyroid and hormones.',
    appt_info_rule3: 'Home Collection: Ensure your address is accurate. Our coordinator will call to verify within 15 minutes.',
    form_fullname: 'Full Name (Patient)',
    form_phone: 'Primary Contact Mobile',
    form_age: 'Age (Years)',
    form_gender: 'Gender',
    form_gender_m: 'Male',
    form_gender_f: 'Female',
    form_gender_o: 'Other',
    form_type: 'Appointment Location Type',
    form_type_walkin: 'Walk-In at Laboratory (Udumalaipettai)',
    form_type_home: 'Free Home Sample Collection (We visit you)',
    form_selection: 'Selected Diagnostic Test / Package',
    form_date: 'Preferred Date',
    form_time: 'Preferred Time Slot',
    form_address: 'Complete Residential Address (For Home Collection)',
    form_message: 'Special instructions / Doctor requests',
    form_submit: 'Confirm & Generate Booking Slip',
    form_success_title: 'Booking Confirmed Successfully!',
    form_success_desc: 'Your appointment request has been processed. Our lab coordinator will call you shortly on the provided number.',
    form_slip_title: 'Official Booking Slip',
    form_slip_booking_id: 'Booking reference ID:',
    form_slip_location: 'Location Mode:',
    form_slip_close: 'Close Slip',
    guide_h2: 'Patient Resources & Preparation',
    guide_intro: 'A successful diagnostic assessment depends heavily on correct prior prep. Follow these standard guidelines to guarantee pristine clinical parameters.',
    guide_q1: '1. Why is 12-hour fasting essential?',
    guide_a1: 'Fasting prevents newly digested food particles, glucose, and fats from entering your bloodstream, ensuring true baseline measurements for cholesterol, glucose, and triglycerides.',
    guide_q2: '2. What can I consume during fasting?',
    guide_a2: 'Only plain water. Avoid tea, coffee, juices, soft drinks, or chewing gum. Do not consume alcohol the night before.',
    guide_q3: '3. What should I prepare for a urine complete test?',
    guide_a3: 'We recommend collecting the first urine voided in the morning. Use the sterile container provided by our lab and collect a mid-stream sample to avoid external contamination.',
    guide_q4: '4. Diabetic Patient Monitoring Schedule',
    guide_a4: 'Diabetic individuals should test Fasting Sugar, PPBS, and HbA1C every 3 months. Regular monitoring helps prevent long-term kidney, eye, and vascular complications.',
    contact_h2: 'Get in Touch with Our Team',
    contact_subtitle: 'Available 24 hours. Located opposite Lakshmi Thirumana Mandapam, Udumalaipettai.',
    contact_phone_card: 'Call 24-Hour Hotline:',
    contact_address_card: 'Laboratory Location:',
    contact_hours_card: 'Clinical Operating Hours:',
    contact_hours_val: '24 Hours a Day, 7 Days a Week (Including Sundays)',
    contact_form_title: 'Send a Message',
    contact_form_name: 'Your Name',
    contact_form_msg: 'Type your message/inquiry',
    contact_form_btn: 'Send Inquiry',
    map_placeholder_label: 'Interactive Location Map — Live Life Healthcare Lab',
    map_placeholder_hint: 'Located right opposite Lakshmi Thirumana Mandapam & near Anushm Theatre in Udumalaipettai, Tamil Nadu 642126.',
    map_directions_btn: 'Get Live GPS Directions',
    skip_greeting: 'Skip Greeting ✕',
    popular_badge: 'Best Value'
  },
  ta: {
    title: 'லைவ் லைப் ஹெல்த்கேர் லேப்',
    tagline: 'தரமான இரத்தப்பரிசோதனை நிலையம்',
    home_collection_badge: 'வீட்டிற்கே வந்து மாதிரி எடுக்கும் வசதி',
    phone_title: 'உதவி தேவையா? 24/7 தொடர்பு கொள்ளவும்',
    working_hours: 'ஆய்வக வசதி: 24 மணி நேரமும் | வாரத்தின் அனைத்து நாட்களும்',
    cmc_certified: 'சி.எம்.சி வெல்லூர் தர திட்ட அங்கீகாரம் பெற்றது',
    nav_home: 'முகப்பு',
    nav_tests: 'பரிசோதனைகள் & பேக்கேஜ்கள்',
    nav_about: 'எங்களைப் பற்றி',
    nav_appointments: 'முன்பதிவு செய்ய',
    nav_faq: 'கேள்வி-பதில் (FAQs)',
    nav_contact: 'தொடர்பு கொள்ள',
    nav_resources: 'நோயாளி வழிகாட்டி',
    hero_badge: 'சி.எம்.சி தர அங்கீகாரம் பெற்ற லேப்',
    hero_title: 'நம்பகமான நோயறிதல் ஆய்வக சேவைகள்',
    hero_subtitle: 'உடுமலைப்பேட்டையில் துல்லியமான, குறைந்த கட்டண, முன்னுரிமை கொண்ட இரத்த மற்றும் நோயறிதல் பரிசோதனைகள்.',
    hero_cta_book: 'இப்போதே முன்பதிவு செய்க',
    hero_cta_tests: 'பரிசோதனை கட்டணப் பட்டியல்',
    hero_stat_automated: '100% முழு தானியங்கி முறை',
    hero_stat_home: 'இலவச ஹோம் கலெக்ஷன்',
    hero_stat_hours: '24/7 மருத்துவ ஆதரவு',
    stat_lab_open: 'ஆய்வகம் 24 மணி நேரமும் செயல்படுகிறது',
    stat_contact_nums: '3 முதன்மை உதவி எண்கள்',
    stat_test_count: '96+ பரிசோதனைகள் வரை',
    stat_auto_system: 'முழுமையான தானியங்கி ஆய்வகம்',
    about_brief_h2: 'லைவ் லைப் ஹெல்த்கேர் லேப் பற்றி',
    about_brief_p1: 'லைவ் லைப் ஹெல்த்கேர் லேப் என்பது தமிழ்நாட்டின் உடுமலைப்பேட்டையில் உள்ள ஒரு முன்னணி நோயறிதல் மையமாகும். S. சதீஷ்குமார் (DMLT., DXT.) அவர்களால் நிறுவப்பட்டு நிர்வகிக்கப்படும் எங்களது ஆய்வகம், கணினிமயமாக்கப்பட்ட நவீன உபகரணங்களுடன் துல்லியமான சோதனை முடிவுகளை வழங்குகிறது.',
    about_brief_p2: 'மதிப்புமிக்க வெல்லூர் சி.எம்.சி தர திட்டத்தில் (CMC Quality Programme) பங்கேற்று, தரக் கட்டுப்பாட்டு வழிகாட்டுதல்களைப் பின்பற்றுகிறோம். எளிய இரத்தப் பரிசோதனை முதல் சிக்கலான ஹார்மோன் ஆய்வுகள் வரை நோயாளிக்கு தகுந்த பாதுகாப்பை வழங்குகிறோம்.',
    about_owner_badge: 'ஆய்வக இயக்குனர் & நிறுவனர்',
    about_learn_more: 'தொழில்நுட்பம் பற்றி அறிய',
    services_h2: 'எங்கள் சிறப்பு ஆய்வக சேவைகள்',
    services_subtitle: 'உயிர்வேதியியல் மற்றும் நோயியல் பரிசோதனைகளைச் செய்ய அதிநவீன கணினிமயமாக்கப்பட்ட கருவிகளைப் பயன்படுத்துகிறோம்.',
    service1_title: 'இரத்தவியல் சோதனைகள் (Haematology)',
    service1_desc: 'முழுமையான இரத்த அணுக்கள் எண்ணிக்கை, தட்டணுக்கள் மற்றும் நுண்ணோக்கி ஸ்லைடு ஆய்வுகள்.',
    service2_title: 'உயிர் வேதியியல் பேனல்கள் (Biochemistry)',
    service2_desc: 'தாது உப்புக்கள், சர்க்கரை அளவுகள், கல்லீரல் மற்றும் சிறுநீரக ஆரோக்கிய குறியீடுகளின் மதிப்பீடு.',
    service3_title: 'தைராய்டு & ஹார்மோன்கள்',
    service3_desc: 'துல்லியமான T3, T4, TSH மற்றும் அத்தியாவசிய வைட்டமின் சோதனைகள் உள்ளிட்ட மேம்பட்ட ஹார்மோன் பகுப்பாய்வுகள்.',
    service4_title: 'நீரிழிவு மேலாண்மை',
    service4_desc: 'HbA1C 3 மாத சராசரி சர்க்கரை கண்காணிப்பு மற்றும் தனிப்பயனாக்கப்பட்ட நீரிழிவு பேக்கேஜ்கள்.',
    service5_title: 'கல்லீரல் மற்றும் சிறுநீரக செயல்பாடு',
    service5_desc: 'கல்லீரல் மற்றும் சிறுநீரக பாதுகாப்பு குறியீடுகளை மிகத்துல்லியமாக சரிபார்க்கும் விரிவான சோதனைகள்.',
    service6_title: 'தனிப்பயன் ஆரோக்கிய பேக்கேஜ்கள்',
    service6_desc: 'அறுவைசிகிச்சைக்கு முந்தைய சோதனைகள், மினி-ஸ்கிரீனிங்ஸ், மாஸ்டர் ஹெல்த் பேனல்கள் மற்றும் முழு உடல் பரிசோதனைகள்.',
    packages_h2: 'எங்கள் தடுப்பு ஆரோக்கிய பேக்கேஜ்கள்',
    packages_subtitle: 'உங்கள் பட்ஜெட்டுக்கு ஏற்ற சிறந்த முழுமையான உடல் பரிசோதனைகள். ஆரோக்கியமே உண்மையான செல்வம்!',
    package_popular: 'மிகவும் பிரபலமானது',
    package_mrp: 'அசல் கட்டணம்',
    package_offer: 'சிறப்பு சலுகை கட்டணம்',
    package_save: 'சேமிப்பு தொகை',
    package_btn_details: 'பரிசோதனை விவரங்கள்',
    package_btn_book: 'முன்பதிவு செய்க',
    why_h2: 'ஏன் லைவ் லைப் லேப்-ஐ தேர்வு செய்ய வேண்டும்?',
    why_1_title: '24-மணி நேர சேவை',
    why_1_desc: 'அவசரக்கால நோயியல் சோதனைகள் மற்றும் 24 மணி நேரமும் உங்களை கவனிக்கும் ஆய்வக தொழில்நுட்ப வல்லுநர்கள்.',
    why_2_title: 'இலவச ஹோம் கலெக்ஷன்',
    why_2_desc: 'எங்களது பயிற்சி பெற்ற ஊழியர் உங்கள் வீட்டிற்கே வந்து இரத்த மாதிரிகளை வசதியாக சேகரிப்பார்.',
    why_3_title: 'CMC வெல்லூர் தரம்',
    why_3_desc: 'தேசிய தர கட்டுப்பாட்டு தரநிலைகளின்படி எங்கள் சோதனைகள் அனைத்தும் உறுதி செய்யப்படுகின்றன.',
    why_4_title: 'முழு கணினிமயமாக்கப்பட்டது',
    why_4_desc: 'மனித தவறுகள் இல்லாத தானியங்கி முறையில் துல்லியமான டிஜிட்டல் சோதனை முடிவுகள்.',
    diabetes_special_h2: 'சிறப்பு நீரிழிவு கண்காணிப்பு பேனல்கள்',
    diabetes_special_subtitle: 'நீரிழிவு நோயாளிகளின் சிறுநீரகம் மற்றும் இரத்த நாளங்களின் ஆரோக்கியத்தை கண்காணிக்க 3 மாதங்களுக்கு ஒருமுறை பரிந்துரைக்கப்படுகிறது.',
    diabetes_special_cta: 'நீரிழிவு பரிசோதனை முன்பதிவு',
    contact_strip_title: 'வீட்டிற்கே வந்து மாதிரி எடுக்க வேண்டுமா?',
    contact_strip_desc: 'எங்களது அங்கீகரிக்கப்பட்ட தொலைபேசி எண்களை அழைக்கவும். எங்கள் குழு உங்களுக்கு உதவ தயாராக உள்ளது.',
    footer_addr_label: 'முதன்மை ஆய்வக முகவரி:',
    footer_cert_label: 'அங்கீகரிக்கப்பட்ட உறுப்பினர்:',
    footer_rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. 2026-2027 ஆண்டிற்கு செல்லுபடியாகும்.',
    search_placeholder: 'இரத்தப் பரிசோதனை, ஹார்மோன், சர்க்கரை அளவு, விலைகளைத் தேடுங்கள்...',
    filter_all: 'அனைத்து துறைகளும்',
    test_prep_label: 'முன்னெச்சரிக்கை:',
    test_price_label: 'பரிசோதனை கட்டணம்:',
    add_to_booking: 'முன்பதிவில் சேர்க்க',
    remove_from_booking: 'முன்பதிவிலிருந்து நீக்க',
    booking_calculator_title: 'ஊடாடும் முன்பதிவு மதிப்பீட்டாளர்',
    booking_selected_count: 'தேர்ந்தெடுக்கப்பட்ட சோதனைகள் / பேக்கேஜ்கள்',
    booking_total_mrp: 'அசல் மொத்த மதிப்பு',
    booking_total_saved: 'நீங்கள் சேமித்த மொத்த தொகை',
    booking_final_total: 'நீங்கள் செலுத்த வேண்டிய இறுதி கட்டணம்',
    booking_proceed_btn: 'முன்பதிவு படிவத்திற்குச் செல்லவும்',
    about_page_hero: 'அன்பான கவனிப்புடன் கூடிய துல்லியமான நோயறிதல்',
    about_story_h3: 'எங்கள் வரலாறு மற்றும் தத்துவம்',
    about_story_p1: 'லைவ் லைப் ஹெல்த்கேர் லேப் உடுமலைப்பேட்டையில் ஒரு எளிய நோக்கத்துடன் தொடங்கப்பட்டது: பிரீமியம் தர சோதனை முடிவுகள் அனைவருக்கும் மலிவான விலையில் கிடைக்க வேண்டும். S. சதீஷ்குமார் அவர்கள் சி.எம்.சி தரத்துடன் கூடிய தானியங்கி ஆய்வகத்தை இங்கு நிறுவினார்.',
    about_story_p2: 'இன்று, நாங்கள் உடுமலைப்பேட்டையின் நம்பகமான 24/7 இரத்த பரிசோதனை நிலையமாக விளங்குகிறோம். அதிகாலை உபவாச பரிசோதனையாக இருந்தாலும் சரி, நள்ளிரவில் அவசர இதய சோதனையாக இருந்தாலும் சரி, எங்களது தானியங்கி அமைப்பு துல்லியத்திற்கு உத்தரவாதம் அளிக்கிறது.',
    about_tech_h3: 'அதிநவீன தானியங்கி உள்கட்டமைப்பு',
    about_tech_desc: 'நாங்கள் தரத்தில் சமரசம் செய்வதில்லை. எங்களது ஆய்வகம் முழு தானியங்கி செல் கவுண்டர் மற்றும் கணினிமயமாக்கப்பட்ட ஆட்டோ அனலைசர்களைக் கொண்டுள்ளது.',
    about_values_h3: 'எங்கள் நோக்கம் & தொலைநோக்கு',
    about_value_mission_title: 'எங்கள் நோக்கம்',
    about_value_mission_p: 'நவீன ஆய்வக ஆட்டோமேஷன் மற்றும் கனிவான கவனிப்பின் மூலம் உடுமலைப்பேட்டையில் உள்ள ஒவ்வொரு வீட்டிற்கும் துல்லியமான பரிசோதனைகளை மலிவு விலையில் வழங்குவது.',
    about_value_vision_title: 'எங்கள் தொலைநோக்கு',
    about_value_vision_p: 'தமிழ்நாட்டில் சிறந்த நோயறிதல் மையமாக அங்கீகரிக்கப்பட வேண்டும், தொழில்நுட்பத்தையும் மக்கள் நலனையும் இணைப்பதே எங்கள் இலக்கு.',
    appt_h2: 'முன்பதிவு படிவம்',
    appt_desc: 'கீழே உள்ள எளிய படிவத்தை நிரப்பவும். உங்கள் முன்பதிவை உறுதி செய்ய அல்லது வீட்டிற்கே வந்து மாதிரி எடுக்க எங்கள் குழு உங்களைத் தொடர்பு கொள்ளும்.',
    appt_info_title: 'முக்கியமான தயாரிப்பு விதிகள்',
    appt_info_rule1: 'உபவாசம்: சர்க்கரை, கொழுப்பு மற்றும் முழு உடல் பரிசோதனைகளுக்கு 12 மணி நேர உபவாசம் (வெறும் வயிறு) அவசியம். தண்ணீர் குடிக்கலாம்.',
    appt_info_rule2: 'நேரம்: ஹார்மோன் மற்றும் தைராய்டு பரிசோதனைகளுக்கு காலை நேரம் (6:00 AM - 10:00 AM) மிகவும் சிறந்தது.',
    appt_info_rule3: 'வீட்டு சேகரிப்பு: உங்கள் முகவரியை சரியாக உள்ளிடவும். 15 நிமிடங்களில் எங்கள் ஒருங்கிணைப்பாளர் உங்களை அழைப்பார்.',
    form_fullname: 'நோயாளி பெயர்',
    form_phone: 'கைபேசி எண்',
    form_age: 'வயது (ஆண்டுகள்)',
    form_gender: 'பாலினம்',
    form_gender_m: 'ஆண்',
    form_gender_f: 'பெண்',
    form_gender_o: 'இதர',
    form_type: 'பரிசோதனை செய்யும் இடம்',
    form_type_walkin: 'ஆய்வகத்திற்கு நேரில் வருதல் (உடுமலைப்பேட்டை)',
    form_type_home: 'கட்டணமில்லா வீட்டுச் சேவை (நாங்கள் உங்களை தேடி வருவோம்)',
    form_selection: 'தேர்ந்தெடுக்கப்பட்ட சோதனை / பேக்கேஜ்',
    form_date: 'விருப்பமான தேதி',
    form_time: 'விருப்பமான நேரம்',
    form_address: 'வீட்டு முகவரி (ஹோம் கலெக்ஷனுக்கு மட்டும்)',
    form_message: 'இதர குறிப்புகள் / மருத்துவர் பரிந்துரைகள்',
    form_submit: 'முன்பதிவு சீட்டை உருவாக்கவும்',
    form_success_title: 'முன்பதிவு வெற்றிகரமாக செய்யப்பட்டது!',
    form_success_desc: 'உங்கள் முன்பதிவு கோரிக்கை ஏற்றுக்கொள்ளப்பட்டது. எங்களது ஒருங்கிணைப்பாளர் விரைவில் உங்களைத் தொடர்பு கொள்வார்.',
    form_slip_title: 'அதிகாரப்பூர்வ முன்பதிவு சீட்டு',
    form_slip_booking_id: 'முன்பதிவு எண் (ID):',
    form_slip_location: 'பரிசோதனை இடம்:',
    form_slip_close: 'மூடவும்',
    guide_h2: 'நோயாளி வழிகாட்டி & தயாரிப்பு',
    guide_intro: 'துல்லியமான சோதனை முடிவுகளுக்கு நோயாளிகள் முறையான முன்னெச்சரிக்கை நடவடிக்கைகளை எடுப்பது அவசியம். பின்வரும் வழிகாட்டுதல்களைப் பின்பற்றவும்.',
    guide_q1: '1. 12 மணி நேர உபவாசம் ஏன் முக்கியம்?',
    guide_a1: 'உபவாசம் இரத்தத்தில் புதிய உணவுத் துகள்கள், சர்க்கரை மற்றும் கொழுப்புகள் நுழைவதைத் தடுக்கிறது, இதன் மூலம் கொலஸ்ட்ரால் மற்றும் சர்க்கரையின் உண்மையான அளவை அறிய முடிகிறது.',
    guide_q2: '2. உபவாசத்தின் போது நான் என்ன சாப்பிடலாம்?',
    guide_a2: 'சாதாரண தண்ணீர் மட்டுமே குடிக்கலாம். டீ, காபி, ஜூஸ், குளிர்பானங்கள் அல்லது மது அருந்துவதை தவிர்க்க வேண்டும்.',
    guide_q3: '3. சிறுநீர் பரிசோதனைக்கு மாதிரி சேகரிப்பது எப்படி?',
    guide_a3: 'காலை எழுந்தவுடன் வெளிவரும் முதல் சிறுநீரின் நடுப்பகுதியை (Mid-stream) சேகரிக்க பரிந்துரைக்கப்படுகிறது. ஆய்வகத்தில் தரும் கிருமிநீக்கம் செய்யப்பட்ட கொள்கலனைப் பயன்படுத்தவும்.',
    guide_q4: '4. நீரிழிவு நோயாளிகளுக்கான பரிந்துரைக்கப்பட்ட கால அளவு',
    guide_a4: 'நீரிழிவு நோயாளிகள் 3 மாதங்களுக்கு ஒருமுறை வெறும் வயிற்று சர்க்கரை, உணவுக்கு பின் சர்க்கரை மற்றும் HbA1C ஆகியவற்றை பரிசோதிக்க வேண்டும். இது சிறுநீரகம் மற்றும் கண் பாதிப்புகளைத் தடுக்கும்.',
    contact_h2: 'எங்கள் குழுவைத் தொடர்பு கொள்ளவும்',
    contact_subtitle: '24 மணி நேரமும் செயல்படுகிறது. லட்சுமி திருமண மண்டபம் எதிர்புறம், உடுமலைப்பேட்டை.',
    contact_phone_card: '24 மணி நேர ஹாட்லைன் எண்:',
    contact_address_card: 'ஆய்வக முகவரி:',
    contact_hours_card: 'செயல்படும் நேரம்:',
    contact_hours_val: '24 மணி நேரமும், வாரத்தின் 7 நாட்களும் (ஞாயிறு உட்பட)',
    contact_form_title: 'செய்டி அனுப்பவும்',
    contact_form_name: 'உங்கள் பெயர்',
    contact_form_msg: 'செய்தி / கேள்வி',
    contact_form_btn: 'சமர்ப்பிக்க',
    map_placeholder_label: 'வரைபடம் — லைவ் லைப் ஹெல்த்கேர் லேப்',
    map_placeholder_hint: 'தமிழ்நாடு, உடுமலைப்பேட்டை, லட்சுமி திருமண மண்டபத்திற்கு எதிர்புறம் மற்றும் அனுஷம் தியேட்டருக்கு அருகில் அமைந்துள்ளது.',
    map_directions_btn: 'வழித்தடம் அறிய (Google Maps)',
    skip_greeting: 'தவிர்க்க ✕',
    popular_badge: 'சிறந்த சலுகை'
  }
};

// --- PREMIUM SVG VECTOR ICON RENDERERS (REPLACES EMOLIS) ---
const SVG_ICONS = {
  stethoscope: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c2.76 0 5-2.24 5-5V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v5c0 2.76 2.24 5 5 5zm0 0v4m0 0a4 4 0 00-4 4h8a4 4 0 00-4-4z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  ),
  bloodDrop: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  flask: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-3 0v11.124a5 5 0 11-2 0V3zm-2 15a2 2 0 104 0 2 2 0 00-4 0z" />
    </svg>
  ),
  butterfly: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16C9 4 4 6 4 10s4 6 8 4m0-10c3 0 8 2 8 6s-4 6-8 4" />
    </svg>
  ),
  sugar: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  gear: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  box: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  clock: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  home: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  shield: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  computer: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  phone: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  location: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  cart: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  lightning: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  flame: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.01 11L11 14h2.518a3 3 0 01-3.639 2.121z" />
    </svg>
  ),
  search: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  info: (className = "w-6 h-6") => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('livelife_lang') || 'en';
  });
  const [page, setPage] = useState('home');
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState({ en: '', ta: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [testFilter, setTestFilter] = useState('All');
  
  // Custom Booking Cart State for interactive estimation
  const [bookedItems, setBookedItems] = useState([]);

  // Appointment Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    gender: 'Male',
    type: 'Walk-in',
    selectedTestName: '',
    date: '',
    time: '',
    address: '',
    message: ''
  });
  const [showSlip, setShowSlip] = useState(false);
  const [generatedSlip, setGeneratedSlip] = useState(null);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Simple active contact form success state
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Persist language
  useEffect(() => {
    localStorage.setItem('livelife_lang', lang);
  }, [lang]);

  // Handle Dynamic Greeting calculation
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('livelife_greeting_dismissed_may2026');
    if (!isDismissed) {
      const hours = new Date().getHours();
      let enG = "Welcome!";
      let taG = "வருக!";

      if (hours >= 5 && hours < 12) {
        enG = "Good Morning!";
        taG = "காலை வணக்கம்!";
      } else if (hours >= 12 && hours < 17) {
        enG = "Good Afternoon!";
        taG = "மதிய வணக்கம்!";
      } else if (hours >= 17 && hours < 21) {
        enG = "Good Evening!";
        taG = "மாலை வணக்கம்!";
      } else {
        enG = "Good Night!";
        taG = "இரவு வணக்கம்!";
      }

      setGreetingText({ en: enG, ta: taG });
      setShowGreeting(true);

      // Auto dismiss after 2.8 seconds
      const timer = setTimeout(() => {
        dismissGreeting();
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissGreeting = () => {
    setShowGreeting(false);
    sessionStorage.setItem('livelife_greeting_dismissed_may2026', 'true');
  };

  const currentTranslation = TRANSLATIONS[lang];

  // Quick Action: Book a particular test or package
  const handlePreBook = (item) => {
    // Add item to booking if not already added
    if (!bookedItems.find(b => b.id === item.id)) {
      setBookedItems(prev => [...prev, item]);
    }
    setFormData(prev => ({
      ...prev,
      selectedTestName: lang === 'ta' ? item.nameTa || item.name : item.name
    }));
    setPage('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookingItem = (item) => {
    const exists = bookedItems.find(b => b.id === item.id);
    if (exists) {
      setBookedItems(prev => prev.filter(b => b.id !== item.id));
    } else {
      setBookedItems(prev => [...prev, item]);
    }
  };

  const clearBookingList = () => {
    setBookedItems([]);
  };

  const totalBookingSummary = useMemo(() => {
    let mrpSum = 0;
    let finalSum = 0;
    bookedItems.forEach(item => {
      // If it is a package, use MRP & offer price
      if (item.mrp) {
        mrpSum += item.mrp;
        finalSum += item.offerPrice;
      } else {
        mrpSum += item.price;
        finalSum += item.price;
      }
    });
    return {
      mrp: mrpSum,
      final: finalSum,
      saved: mrpSum - finalSum
    };
  }, [bookedItems]);

  // Handle booking form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.date) {
      return;
    }

    const slipId = 'LLH-' + Math.floor(100000 + Math.random() * 900000);
    const selectedLabels = bookedItems.map(item => lang === 'ta' ? item.nameTa || item.name : item.name).join(', ') || formData.selectedTestName || 'Routine General Screen';

    const slipInfo = {
      id: slipId,
      patientName: formData.fullName,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender,
      type: formData.type,
      selectedItems: selectedLabels,
      date: formData.date,
      time: formData.time || '08:00 AM - 11:00 AM',
      address: formData.type === 'Home Collection' ? formData.address : 'Laboratory Walk-in (Udumalaipettai)',
      totalAmount: totalBookingSummary.final > 0 ? totalBookingSummary.final : 'To be estimated at counter'
    };

    setGeneratedSlip(slipInfo);
    setShowSlip(true);
  };

  // Live real-time filter for tests
  const filteredTests = useMemo(() => {
    return TESTS_DATA.filter(test => {
      const matchCategory = testFilter === 'All' || test.category === testFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = test.name.toLowerCase().includes(searchLower) ||
                          (test.nameTa && test.nameTa.toLowerCase().includes(searchLower)) ||
                          test.category.toLowerCase().includes(searchLower) ||
                          (test.desc && test.desc.toLowerCase().includes(searchLower));
      return matchCategory && matchSearch;
    });
  }, [searchQuery, testFilter]);

  return (
    <div className={`min-h-screen flex flex-col font-sans text-[#1A1A2E] bg-white antialiased selection:bg-[#1A7A8A] selection:text-white`}>
      
      {/* 1. GREETING EXPERIENCE OVERLAY */}
      {showGreeting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2342] to-[#1A7A8A] text-white px-6 transition-all duration-500">
          
          {/* Logo Brand Image */}
          <div className="mb-6 transform animate-pulse bg-white p-2 rounded-2xl shadow-xl border border-white/20">
            <img 
              src={LOGO_URL} 
              alt="Live Life Healthcare Lab Logo" 
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/120?text=LL+Lab";
              }}
            />
          </div>

          {/* Slogan */}
          <p className="text-[#B2EBF2] uppercase tracking-widest text-xs font-semibold mb-2">
            Live Life Healthcare Lab
          </p>

          {/* Time dynamic text */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 transition-all duration-300">
            {lang === 'ta' ? greetingText.ta : greetingText.en}
          </h1>

          {/* Welcome subtitle */}
          <p className="text-lg md:text-xl text-center font-light max-w-xl text-white/90 px-4 mb-6 leading-relaxed">
            {lang === 'en' 
              ? "Welcome to Live Life Healthcare Lab — Quality Diagnostics, Trusted Results."
              : "லைவ் லைப் ஹெல்த்கேர் லேப்-க்கு வருக — தரமான பரிசோதனைகள், நம்பகமான முடிவுகள்."
            }
          </p>

          {/* Dynamic Badges */}
          <div className="flex flex-wrap gap-2 justify-center max-w-lg mb-10">
            <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/20">24-Hour Lab</span>
            <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/20">Free Home Collection</span>
            <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/20">CMC Certified</span>
          </div>

          {/* Skip Button */}
          <button 
            onClick={dismissGreeting}
            className="absolute bottom-6 right-6 text-sm text-white/75 hover:text-white underline transition-colors"
          >
            {currentTranslation.skip_greeting}
          </button>
        </div>
      )}

      {/* 2. TOP BANNER STRIP */}
      <div className="bg-[#0A2342] text-white text-xs md:text-sm py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60] inline-block animate-ping"></span>
            <span className="font-semibold text-xs bg-[#1A7A8A] px-2 py-0.5 rounded text-white">24 HRS</span>
            <span className="text-gray-300 text-xs">{currentTranslation.working_hours}</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-[#D4AF37] font-semibold text-xs">★ {currentTranslation.cmc_certified}</span>
            <span className="text-gray-300">|</span>
            <a href="tel:+919751504558" className="hover:text-[#B2EBF2] font-semibold flex items-center gap-1.5">
              {SVG_ICONS.phone("w-4 h-4 text-[#1A7A8A] inline")}
              9751504558
            </a>
          </div>
        </div>
      </div>

      {/* 3. GLOBAL NAVIGATION NAVBAR */}
      <header className="sticky top-0 z-40 bg-white shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          
          {/* Logo Image + Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-[#DCE8F5] shadow-sm">
              <img 
                src={LOGO_URL} 
                alt="Live Life Lab Mini Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/48?text=LL";
                }}
              />
            </div>
            <div>
              <div className="text-lg font-bold text-[#0A2342] leading-tight font-sans tracking-tight uppercase">
                {lang === 'ta' ? 'லைவ் லைப் லேப்' : 'Live Life Lab'}
              </div>
              <div className="text-[10px] text-[#4A5568] font-medium leading-none tracking-wide">
                Healthcare Laboratory • Udumalaipettai
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => setPage('home')} className={`font-semibold text-sm transition-colors ${page === 'home' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_home}</button>
            <button onClick={() => setPage('tests')} className={`font-semibold text-sm transition-colors ${page === 'tests' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_tests}</button>
            <button onClick={() => setPage('about')} className={`font-semibold text-sm transition-colors ${page === 'about' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_about}</button>
            <button onClick={() => setPage('appointments')} className={`font-semibold text-sm transition-colors ${page === 'appointments' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_appointments}</button>
            <button onClick={() => setPage('faq')} className={`font-semibold text-sm transition-colors ${page === 'faq' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_faq}</button>
            <button onClick={() => setPage('resources')} className={`font-semibold text-sm transition-colors ${page === 'resources' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_resources}</button>
            <button onClick={() => setPage('contact')} className={`font-semibold text-sm transition-colors ${page === 'contact' ? 'text-[#1A7A8A] border-b-2 border-[#1A7A8A] pb-1' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}>{currentTranslation.nav_contact}</button>
          </nav>

          {/* Right Controls: Language Toggle + CTA */}
          <div className="flex items-center gap-3">
            
            {/* Language Pill Toggle */}
            <div className="bg-[#E8F4FD] rounded-full p-1 flex items-center border border-[#DCE8F5]">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-[#1A7A8A] text-white shadow-md' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ta')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'ta' ? 'bg-[#1A7A8A] text-white shadow-md' : 'text-[#4A5568] hover:text-[#1A7A8A]'}`}
              >
                தமிழ்
              </button>
            </div>

            {/* Quick CTAs */}
            <button 
              onClick={() => {
                setPage('appointments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-block px-5 py-2.5 text-xs font-bold bg-[#1A7A8A] hover:bg-[#135E6B] text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {currentTranslation.nav_appointments}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation for usability */}
        <div className="lg:hidden flex overflow-x-auto border-t border-gray-100 bg-gray-50/50 py-2.5 px-3 scrollbar-none gap-2">
          <button onClick={() => setPage('home')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'home' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_home}</button>
          <button onClick={() => setPage('tests')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'tests' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_tests}</button>
          <button onClick={() => setPage('about')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'about' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_about}</button>
          <button onClick={() => setPage('appointments')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'appointments' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_appointments}</button>
          <button onClick={() => setPage('faq')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'faq' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_faq}</button>
          <button onClick={() => setPage('resources')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'resources' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_resources}</button>
          <button onClick={() => setPage('contact')} className={`whitespace-nowrap px-3 py-1 text-xs font-bold rounded-md transition-all ${page === 'contact' ? 'bg-[#1A7A8A] text-white' : 'text-[#4A5568] hover:bg-gray-200'}`}>{currentTranslation.nav_contact}</button>
        </div>
      </header>

      {/* 4. DYNAMIC PAGE ROUTING & INTERACTION */}
      <main className="flex-grow">

        {/* ================= PAGE: HOME ================= */}
        {page === 'home' && (
          <div className="fade-in">
            
            {/* Section A: Hero Banner with Premium Background Image and Overlay */}
            <section 
              className="relative overflow-hidden bg-cover bg-center text-white py-16 lg:py-24 px-6"
              style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.95), rgba(26, 122, 138, 0.85)), url(${HERO_BG_URL})` }}
            >
              
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 flex flex-col items-start gap-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border border-[#D4AF37]/50 backdrop-blur-sm">
                    {SVG_ICONS.shield("w-4 h-4 text-[#D4AF37]")}
                    {currentTranslation.hero_badge}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
                    {currentTranslation.hero_title}
                  </h1>

                  {/* Optional Tamil alternate header for regional precision */}
                  {lang === 'en' && (
                    <p className="text-lg font-semibold text-[#B2EBF2] italic">
                      "லைவ் லைப் ஹெல்த்கேர் லேப் — தரமான பரிசோதனைகள், நம்பகமான முடிவுகள்"
                    </p>
                  )}

                  <p className="text-gray-200 text-base md:text-lg max-w-xl leading-relaxed">
                    {currentTranslation.hero_subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        setPage('appointments');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-[#1A7A8A] hover:bg-[#135E6B] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      {SVG_ICONS.stethoscope("w-5 h-5 text-white")}
                      {currentTranslation.hero_cta_book}
                    </button>
                    <button 
                      onClick={() => {
                        setPage('tests');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-transparent border-2 border-white/45 hover:border-white text-white font-bold rounded-lg transition-all text-center hover:bg-white/5 flex items-center justify-center gap-2"
                    >
                      {SVG_ICONS.search("w-5 h-5 text-white")}
                      {currentTranslation.hero_cta_tests}
                    </button>
                  </div>

                  {/* Trust Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full">
                    <div className="flex items-center gap-2 text-gray-200">
                      {SVG_ICONS.lightning("w-5 h-5 text-[#B2EBF2]")}
                      <span className="text-xs font-semibold">{currentTranslation.hero_stat_automated}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                      {SVG_ICONS.home("w-5 h-5 text-[#B2EBF2]")}
                      <span className="text-xs font-semibold">{currentTranslation.hero_stat_home}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                      {SVG_ICONS.clock("w-5 h-5 text-[#B2EBF2]")}
                      <span className="text-xs font-semibold">{currentTranslation.hero_stat_hours}</span>
                    </div>
                  </div>

                </div>

                {/* Right Illustration side / Glassmorphic Panel */}
                <div className="lg:col-span-5 hidden lg:flex justify-center">
                  <div className="relative w-full max-w-sm aspect-square bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-4 rounded-2xl bg-[#0A2342]/90 flex flex-col items-center justify-center text-center p-6 border border-white/10 shadow-2xl">
                      
                      {/* Diagnostic SVG Icon */}
                      <div className="w-16 h-16 bg-[#1A7A8A]/10 rounded-full flex items-center justify-center text-[#1A7A8A] mb-4 animate-bounce">
                        {SVG_ICONS.shield("w-10 h-10 text-[#1A7A8A]")}
                      </div>

                      <div className="text-lg font-bold text-white uppercase tracking-wider mb-1">
                        CMC quality standard
                      </div>
                      <p className="text-xs text-gray-300 max-w-xs mb-4">
                        Registered and certified testing workflow ensures clinical reports match state benchmark validation.
                      </p>

                      <span className="px-3 py-1 bg-[#27AE60]/20 text-green-400 text-xs font-bold rounded-full border border-[#27AE60]/40 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#27AE60] inline-block"></span>
                        ● Live Active Monitoring
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* Section B: Stats / Trust Bar */}
            <section className="bg-gradient-to-r from-[#1A7A8A] to-[#4A9EBF] text-white py-8 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="p-4 border-r border-white/20 last:border-none">
                  <div className="text-3xl lg:text-4xl font-extrabold text-[#D4AF37] flex items-center justify-center gap-2">
                    {SVG_ICONS.clock("w-8 h-8 text-[#D4AF37] inline")}
                    24 HRS
                  </div>
                  <div className="text-xs lg:text-sm text-white/90 font-medium mt-1">{currentTranslation.stat_lab_open}</div>
                </div>
                <div className="p-4 sm:border-r border-white/20 last:border-none">
                  <div className="text-3xl lg:text-4xl font-extrabold text-[#D4AF37] flex items-center justify-center gap-2">
                    {SVG_ICONS.phone("w-8 h-8 text-[#D4AF37] inline")}
                    3
                  </div>
                  <div className="text-xs lg:text-sm text-white/90 font-medium mt-1">{currentTranslation.stat_contact_nums}</div>
                </div>
                <div className="p-4 border-r border-white/20 last:border-none">
                  <div className="text-3xl lg:text-4xl font-extrabold text-[#D4AF37] flex items-center justify-center gap-2">
                    {SVG_ICONS.box("w-8 h-8 text-[#D4AF37] inline")}
                    96+
                  </div>
                  <div className="text-xs lg:text-sm text-white/90 font-medium mt-1">{currentTranslation.stat_test_count}</div>
                </div>
                <div className="p-4 last:border-none">
                  <div className="text-3xl lg:text-4xl font-extrabold text-[#D4AF37] flex items-center justify-center gap-2">
                    {SVG_ICONS.computer("w-8 h-8 text-[#D4AF37] inline")}
                    100%
                  </div>
                  <div className="text-xs lg:text-sm text-white/90 font-medium mt-1">{currentTranslation.stat_auto_system}</div>
                </div>
              </div>
            </section>

            {/* Section C: About the Lab (Brief) */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Visual Left Block */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#1A7A8A] to-[#4A9EBF] rounded-3xl blur opacity-25"></div>
                  <div className="relative bg-[#F7FBFF] rounded-2xl p-8 border border-[#DCE8F5] shadow-lg">
                    
                    {/* Clinical Details Badge */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A] border border-[#DCE8F5]">
                          {SVG_ICONS.stethoscope("w-7 h-7 text-[#1A7A8A]")}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase">Laboratory Director</div>
                          <h4 className="text-lg font-bold text-[#0A2342]">S. SatheeshKumar, DMLT., DXT.</h4>
                        </div>
                      </div>

                      {/* Accent Box */}
                      <div className="bg-[#E8F4FD] p-4 rounded-xl border-l-4 border-[#1A7A8A]">
                        <p className="text-sm text-[#0A2342] font-semibold leading-relaxed">
                          "Accurate diagnostics is the first step to standard medical cure. Our automated lab facility operates round the clock to deliver precision on call."
                        </p>
                      </div>

                      {/* CMC logo display */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xs text-[#1A7A8A] font-bold uppercase tracking-wider flex items-center gap-1">
                          {SVG_ICONS.shield("w-4 h-4 text-[#1A7A8A]")}
                          CMC quality programme participant
                        </div>
                        <span className="text-xs font-semibold bg-[#27AE60]/10 text-[#27AE60] px-3 py-1 rounded-full">
                          Standard Certified
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Content Right Block */}
                <div className="flex flex-col items-start gap-6">
                  <span className="text-xs font-bold text-[#1A7A8A] uppercase tracking-widest bg-[#E8F4FD] px-3 py-1 rounded-full flex items-center gap-1">
                    {SVG_ICONS.shield("w-3.5 h-3.5 text-[#1A7A8A]")}
                    Professional Pathology Setup
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2342]">
                    {currentTranslation.about_brief_h2}
                  </h2>
                  <p className="text-[#4A5568] leading-relaxed">
                    {currentTranslation.about_brief_p1}
                  </p>
                  <p className="text-[#4A5568] leading-relaxed">
                    {currentTranslation.about_brief_p2}
                  </p>
                  
                  <button 
                    onClick={() => {
                      setPage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group text-sm font-bold text-[#1A7A8A] hover:text-[#0A2342] transition-colors flex items-center gap-2"
                  >
                    {currentTranslation.about_learn_more} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

              </div>
            </section>

            {/* Section D: Services Overview */}
            <section className="py-16 px-6 bg-[#F7FBFF]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold text-[#1A7A8A] uppercase tracking-widest bg-[#E8F4FD] px-3 py-1 rounded-full">
                    Advanced Diagnosis
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2342] mt-3">
                    {currentTranslation.services_h2}
                  </h2>
                  <p className="text-[#4A5568] text-sm mt-2">
                    {currentTranslation.services_subtitle}
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* S1 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.bloodDrop("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service1_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service1_desc}</p>
                  </div>

                  {/* S2 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.flask("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service2_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service2_desc}</p>
                  </div>

                  {/* S3 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.butterfly("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service3_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service3_desc}</p>
                  </div>

                  {/* S4 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.sugar("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service4_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service4_desc}</p>
                  </div>

                  {/* S5 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.gear("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service5_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service5_desc}</p>
                  </div>

                  {/* S6 */}
                  <div className="bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FD] text-[#1A7A8A] flex items-center justify-center">
                      {SVG_ICONS.box("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2342]">{currentTranslation.service6_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.service6_desc}</p>
                  </div>

                </div>
              </div>
            </section>

            {/* Section E: Featured Packages */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    Highly Recommended Checks
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2342] mt-3">
                    {currentTranslation.packages_h2}
                  </h2>
                  <p className="text-[#4A5568] text-sm mt-2">
                    {currentTranslation.packages_subtitle}
                  </p>
                </div>

                {/* Display Top 4 Packages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PACKAGES_DATA.slice(0, 4).map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`relative bg-[#F7FBFF] rounded-xl border-2 transition-all p-5 flex flex-col justify-between ${
                        pkg.popular 
                          ? 'border-[#1A7A8A] shadow-md transform -translate-y-1' 
                          : 'border-[#DCE8F5] hover:border-[#1A7A8A] shadow-sm'
                      }`}
                    >
                      {/* Popular Ribbon */}
                      {pkg.popular && (
                        <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#1A7A8A] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1 shadow">
                          {SVG_ICONS.flame("w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]")}
                          {currentTranslation.package_popular}
                        </span>
                      )}

                      <div>
                        {/* Package Name */}
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="text-base font-extrabold text-[#0A2342] leading-tight">
                            {lang === 'ta' ? pkg.nameTa : pkg.name}
                          </h3>
                          <span className="bg-[#1A7A8A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
                            {pkg.testsCount} Tests
                          </span>
                        </div>

                        {/* Prep */}
                        <p className="text-[11px] text-[#C0392B] font-bold mb-4 flex items-center gap-1">
                          {SVG_ICONS.info("w-3.5 h-3.5 text-[#C0392B]")}
                          {lang === 'ta' ? pkg.prepTa : pkg.prep}
                        </p>

                        {/* Checklist items */}
                        <ul className="text-xs text-[#4A5568] space-y-1.5 mb-6">
                          {(lang === 'ta' ? pkg.includesTa : pkg.includes).slice(0, 4).map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#27AE60] font-bold">✓</span>
                              <span className="leading-tight">{inc}</span>
                            </li>
                          ))}
                          {(pkg.includes.length > 4) && (
                            <li className="text-[11px] text-[#1A7A8A] font-bold italic">
                              + {pkg.includes.length - 4} more diagnostics included
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Pricing block */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                          <span>{currentTranslation.package_mrp}:</span>
                          <span className="line-through text-red-500">₹{pkg.mrp}</span>
                        </div>
                        <div className="flex justify-between items-end mb-4">
                          <span className="text-xs text-[#0A2342] font-semibold">{currentTranslation.package_offer}:</span>
                          <span className="text-2xl font-extrabold text-[#1A7A8A]">₹{pkg.offerPrice}</span>
                        </div>

                        {/* Save Banner */}
                        <div className="bg-[#27AE60]/10 border border-[#27AE60]/20 rounded p-1.5 text-center text-xs text-[#27AE60] font-extrabold mb-3">
                          {currentTranslation.package_save} ₹{pkg.savings}!
                        </div>

                        {/* CTA button inside */}
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => {
                              setPage('tests');
                              setSearchQuery(pkg.name);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-2 py-2 text-[10px] font-bold text-[#1A7A8A] bg-white border border-[#1A7A8A] rounded hover:bg-[#E8F4FD] transition-colors"
                          >
                            {currentTranslation.package_btn_details}
                          </button>
                          <button 
                            onClick={() => handlePreBook(pkg)}
                            className="px-2 py-2 text-[10px] font-bold text-white bg-[#1A7A8A] rounded hover:bg-[#135E6B] transition-colors text-center"
                          >
                            {currentTranslation.package_btn_book}
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section F: Diabetes Special Highlight */}
            <section className="py-16 px-6 bg-gradient-to-tr from-[#0A2342] to-[#1A7A8A] text-white">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left info content */}
                  <div className="lg:col-span-6 flex flex-col items-start gap-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-widest border border-red-500 flex items-center gap-1.5">
                      {SVG_ICONS.info("w-3.5 h-3.5 text-white")}
                      Diabetes Critical Panel
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                      {currentTranslation.diabetes_special_h2}
                    </h2>
                    <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                      {currentTranslation.diabetes_special_subtitle}
                    </p>
                    <button 
                      onClick={() => {
                        setPage('tests');
                        setSearchQuery('Diabetes');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#C29D2F] text-[#0A2342] font-extrabold rounded shadow transition-all text-sm flex items-center gap-1.5"
                    >
                      {SVG_ICONS.sugar("w-4 h-4 text-[#0A2342]")}
                      {currentTranslation.diabetes_special_cta}
                    </button>
                  </div>

                  {/* Right side package cards */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Diabetes Card 1 */}
                    <div className="bg-white text-[#1A1A2E] p-5 rounded-xl border border-gray-100 shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-extrabold text-sm text-[#0A2342]">Diabetes Essential</h4>
                          <span className="bg-[#E8F4FD] text-[#1A7A8A] text-[10px] font-bold px-2 py-0.5 rounded">10 Tests</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-3">Includes: Fasting Sugar, PPBS, HbA1C, Blood Urea, Creatinine, Triglycerides, BUN, eGFR.</p>
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 line-through">₹1,000</span>
                          <div className="text-lg font-black text-[#1A7A8A]">₹550</div>
                        </div>
                        <button 
                          onClick={() => handlePreBook(PACKAGES_DATA.find(p => p.id === 'p6'))}
                          className="px-3 py-1.5 bg-[#1A7A8A] text-white text-[10px] font-bold rounded hover:bg-[#135E6B] transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>

                    {/* Diabetes Card 2 */}
                    <div className="bg-white text-[#1A1A2E] p-5 rounded-xl border border-gray-100 shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-extrabold text-sm text-[#0A2342]">Diabetes Advanced</h4>
                          <span className="bg-[#E8F4FD] text-[#1A7A8A] text-[10px] font-bold px-2 py-0.5 rounded">20 Tests</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-3">Includes: Fasting Sugar, PPBS, Full Lipid Profile, HbA1C, Serum Creatinine, Blood Urea, BUN, eGFR.</p>
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 line-through">₹1,200</span>
                          <div className="text-lg font-black text-[#1A7A8A]">₹899</div>
                        </div>
                        <button 
                          onClick={() => handlePreBook(PACKAGES_DATA.find(p => p.id === 'p7'))}
                          className="px-3 py-1.5 bg-[#1A7A8A] text-white text-[10px] font-bold rounded hover:bg-[#135E6B] transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* Section G: Why Choose Us */}
            <section className="py-16 px-6 bg-[#F7FBFF]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2342]">
                    {currentTranslation.why_h2}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* P1 */}
                  <div className="bg-white p-5 rounded-xl border border-[#DCE8F5] shadow-sm text-center flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A]">
                      {SVG_ICONS.clock("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2342]">{currentTranslation.why_1_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.why_1_desc}</p>
                  </div>

                  {/* P2 */}
                  <div className="bg-white p-5 rounded-xl border border-[#DCE8F5] shadow-sm text-center flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A]">
                      {SVG_ICONS.home("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2342]">{currentTranslation.why_2_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.why_2_desc}</p>
                  </div>

                  {/* P3 */}
                  <div className="bg-white p-5 rounded-xl border border-[#DCE8F5] shadow-sm text-center flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A]">
                      {SVG_ICONS.shield("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2342]">{currentTranslation.why_3_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.why_3_desc}</p>
                  </div>

                  {/* P4 */}
                  <div className="bg-white p-5 rounded-xl border border-[#DCE8F5] shadow-sm text-center flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A]">
                      {SVG_ICONS.computer("w-7 h-7 text-[#1A7A8A]")}
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2342]">{currentTranslation.why_4_title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{currentTranslation.why_4_desc}</p>
                  </div>

                </div>
              </div>
            </section>

            {/* Section H: Contact Strip */}
            <section className="bg-[#E8F4FD] border-t border-b border-[#DCE8F5] py-12 px-6 text-center">
              <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0A2342]">
                  {currentTranslation.contact_strip_title}
                </h3>
                <p className="text-sm text-[#4A5568] max-w-xl">
                  {currentTranslation.contact_strip_desc}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <a href="tel:+919751504558" className="px-5 py-3 bg-[#1A7A8A] hover:bg-[#135E6B] text-white text-sm font-extrabold rounded-lg shadow inline-flex items-center gap-2">
                    {SVG_ICONS.phone("w-4 h-4 text-white")}
                    Call 9751504558
                  </a>
                  <a href="tel:+919751744558" className="px-5 py-3 bg-[#0A2342] hover:bg-black text-white text-sm font-extrabold rounded-lg shadow inline-flex items-center gap-2">
                    {SVG_ICONS.phone("w-4 h-4 text-white")}
                    Call 9751744558
                  </a>
                  <a href="tel:+918190004558" className="px-5 py-3 bg-white border border-[#DCE8F5] text-[#0A2342] hover:bg-gray-100 text-sm font-extrabold rounded-lg shadow inline-flex items-center gap-2">
                    {SVG_ICONS.phone("w-4 h-4 text-[#0A2342]")}
                    Call 8190004558
                  </a>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ================= PAGE: TESTS & PACKAGES ================= */}
        {page === 'tests' && (
          <div className="py-12 px-6 max-w-7xl mx-auto fade-in">
            
            {/* Realtime Search & Category filter */}
            <div className="bg-[#0A2342] text-white rounded-2xl p-6 lg:p-8 mb-8">
              <h2 className="text-xl lg:text-3xl font-extrabold mb-4 text-center">
                Search Diagnostic Tests & Health Packages
              </h2>
              
              {/* Search input with clear button */}
              <div className="relative max-w-2xl mx-auto mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  {SVG_ICONS.search("w-5 h-5 text-gray-400")}
                </span>
                <input 
                  type="text"
                  placeholder={currentTranslation.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-[#1A1A2E] rounded-xl pl-12 pr-12 py-4 focus:outline-none focus:ring-4 focus:ring-[#1A7A8A]/50 font-medium placeholder:text-gray-400 shadow-inner text-sm md:text-base"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#1A1A2E]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Department Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['All', 'Haematology', 'Biochemistry', 'Urine Analysis', 'Electrolytes', 'Serology / Immunology', 'Thyroid & Hormones'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setTestFilter(cat)}
                    className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                      testFilter === cat 
                        ? 'bg-[#1A7A8A] border-[#1A7A8A] text-white shadow' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-200'
                    }`}
                  >
                    {cat === 'All' ? currentTranslation.filter_all : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Interactive Booking Cost Estimator Cart */}
              <div className="lg:col-span-4 bg-[#F7FBFF] rounded-2xl border border-[#DCE8F5] p-5 lg:sticky lg:top-32 shadow-sm">
                <h3 className="text-base font-extrabold text-[#0A2342] border-b border-[#DCE8F5] pb-3 mb-4 flex items-center gap-2">
                  {SVG_ICONS.cart("w-5 h-5 text-[#0A2342]")}
                  <span>{currentTranslation.booking_calculator_title}</span>
                </h3>

                {bookedItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs">
                    <p className="mb-2">No test selected yet.</p>
                    <p className="font-semibold text-[#1A7A8A]">Click "Add to Booking List" inside any test card below to live estimate!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    
                    {/* List of booked items */}
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {bookedItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-[#DCE8F5] text-xs">
                          <div className="pr-2">
                            <div className="font-extrabold text-[#0A2342] line-clamp-1">
                              {lang === 'ta' ? item.nameTa || item.name : item.name}
                            </div>
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase font-semibold">
                              {item.category || 'Package'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-[#1A7A8A]">₹{item.offerPrice || item.price}</span>
                            <button 
                              onClick={() => handleToggleBookingItem(item)}
                              className="text-red-500 hover:text-red-700 font-bold px-1"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={clearBookingList}
                      className="text-right text-[10px] text-red-500 hover:underline font-bold"
                    >
                      Clear Selection List
                    </button>

                    {/* Cost Summary block */}
                    <div className="pt-4 border-t border-[#DCE8F5] space-y-2 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>{currentTranslation.booking_total_mrp}:</span>
                        <span>₹{totalBookingSummary.mrp}</span>
                      </div>
                      
                      {totalBookingSummary.saved > 0 && (
                        <div className="flex justify-between text-[#27AE60] font-extrabold">
                          <span>{currentTranslation.booking_total_saved}:</span>
                          <span>-₹{totalBookingSummary.saved}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-[#0A2342] font-black text-sm pt-2 border-t border-dashed border-[#DCE8F5]">
                        <span>{currentTranslation.booking_final_total}:</span>
                        <span className="text-lg text-[#1A7A8A]">₹{totalBookingSummary.final}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          selectedTestName: bookedItems.map(b => lang === 'ta' ? b.nameTa || b.name : b.name).join(', ')
                        }));
                        setPage('appointments');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-2 w-full py-3 bg-[#27AE60] hover:bg-[#219653] text-white font-extrabold text-xs rounded-lg transition-all shadow text-center"
                    >
                      {currentTranslation.booking_proceed_btn} →
                    </button>

                  </div>
                )}

                {/* Constant Phlebotomist Dispatch Note */}
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 text-[11px] text-[#4A5568] flex items-start gap-2">
                  <div className="shrink-0 mt-0.5">
                    {SVG_ICONS.info("w-4 h-4 text-[#1A7A8A]")}
                  </div>
                  <p>
                    All diagnostic packages require a <strong>12-hour fasting window</strong> for absolute biochemical clinical correctness. Fasting urine samples are preferred.
                  </p>
                </div>
              </div>

              {/* Right Side: Tests Directory */}
              <div className="lg:col-span-8">

                {/* Show Category heading */}
                <h3 className="text-lg font-black text-[#0A2342] mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
                  <span>
                    {testFilter === 'All' ? currentTranslation.filter_all : testFilter} ({filteredTests.length})
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    Showing prices for 2026-2027
                  </span>
                </h3>

                {filteredTests.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 mb-2">No matching tests discovered in this department.</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setTestFilter('All');
                      }}
                      className="text-[#1A7A8A] hover:underline font-bold text-xs"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTests.map((test) => {
                      const isAdded = bookedItems.some(b => b.id === test.id);
                      return (
                        <div 
                          key={test.id}
                          className="bg-white p-5 rounded-xl border border-[#DCE8F5] shadow-sm hover:shadow-md hover:border-[#1A7A8A]/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <h4 className="font-extrabold text-sm text-[#0A2342] leading-tight">
                                {lang === 'ta' ? test.nameTa || test.name : test.name}
                              </h4>
                              <span className="bg-[#E8F4FD] text-[#1A7A8A] text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                                {test.category}
                              </span>
                            </div>

                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                              {lang === 'ta' ? test.descTa || test.desc : test.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            {/* Prep instruction */}
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] text-gray-400">{currentTranslation.test_prep_label}</span>
                              <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                                {SVG_ICONS.info("w-3 h-3 text-[#C0392B]")}
                                {lang === 'ta' ? test.prepTa || test.prep : test.prep}
                              </span>
                            </div>

                            {/* Testing cost & add control */}
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-[10px] text-gray-400 block leading-none mb-1">{currentTranslation.test_price_label}</span>
                                <span className="text-base font-black text-[#1A7A8A]">₹{test.price}</span>
                              </div>

                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleToggleBookingItem(test)}
                                  className={`px-2.5 py-1.5 text-[10px] font-bold rounded transition-colors ${
                                    isAdded 
                                      ? 'bg-red-500 text-white hover:bg-red-600' 
                                      : 'bg-[#1A7A8A] text-white hover:bg-[#135E6B]'
                                  }`}
                                >
                                  {isAdded ? '✕ Remove' : '＋ Add List'}
                                </button>
                                <button 
                                  onClick={() => handlePreBook(test)}
                                  className="px-2.5 py-1.5 text-[10px] font-bold bg-[#0A2342] hover:bg-black text-white rounded transition-colors"
                                >
                                  Book Instant
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ================= PAGE: ABOUT US ================= */}
        {page === 'about' && (
          <div className="fade-in">
            
            {/* Banner block */}
            <div className="bg-gradient-to-tr from-[#0A2342] to-[#1A7A8A] text-white py-16 px-6 text-center">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                A Decade of Pathology Trust
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 max-w-2xl mx-auto leading-tight">
                {currentTranslation.about_page_hero}
              </h2>
            </div>

            {/* Narrative Sections */}
            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-8 space-y-8">
                
                {/* Philosophical Story */}
                <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5]">
                  <h3 className="text-lg font-black text-[#0A2342] mb-3">
                    {currentTranslation.about_story_h3}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
                    {currentTranslation.about_story_p1}
                  </p>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {currentTranslation.about_story_p2}
                  </p>
                </div>

                {/* Tech specifications */}
                <div className="bg-[#F7FBFF] p-6 rounded-2xl border border-[#DCE8F5]">
                  <h3 className="text-lg font-black text-[#0A2342] mb-2">
                    {currentTranslation.about_tech_h3}
                  </h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed mb-4">
                    {currentTranslation.about_tech_desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-xl border border-[#DCE8F5] flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A] mb-2">
                        {SVG_ICONS.lightning("w-6 h-6 text-[#1A7A8A]")}
                      </div>
                      <h4 className="font-bold text-xs text-[#0A2342] mt-2">Computerised Auto Analyser</h4>
                      <p className="text-[10px] text-gray-400 mt-1">High fidelity liver and kidney evaluation.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-[#DCE8F5] flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A] mb-2">
                        {SVG_ICONS.bloodDrop("w-6 h-6 text-[#1A7A8A]")}
                      </div>
                      <h4 className="font-bold text-xs text-[#0A2342] mt-2">Automated Cell Counter</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Direct blood profiling with zero human diluent errors.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-[#DCE8F5] flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#E8F4FD] flex items-center justify-center text-[#1A7A8A] mb-2">
                        {SVG_ICONS.butterfly("w-6 h-6 text-[#1A7A8A]")}
                      </div>
                      <h4 className="font-bold text-xs text-[#0A2342] mt-2">Advanced Thyroid Module</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Ultra-accurate thyroid gland testing and assay profiling.</p>
                    </div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] flex flex-col gap-2">
                    <h4 className="font-extrabold text-sm text-[#1A7A8A] flex items-center gap-1.5">
                      {SVG_ICONS.shield("w-4 h-4 text-[#1A7A8A]")}
                      {currentTranslation.about_value_mission_title}
                    </h4>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {currentTranslation.about_value_mission_p}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] flex flex-col gap-2">
                    <h4 className="font-extrabold text-sm text-[#1A7A8A] flex items-center gap-1.5">
                      {SVG_ICONS.computer("w-4 h-4 text-[#1A7A8A]")}
                      {currentTranslation.about_value_vision_title}
                    </h4>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {currentTranslation.about_value_vision_p}
                    </p>
                  </div>
                </div>

              </div>

              {/* Sidebar Director Card */}
              <div className="lg:col-span-4 bg-[#0A2342] text-white p-6 rounded-2xl shadow-lg flex flex-col gap-6">
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white/20 mb-4 bg-white">
                    <img 
                      src={LOGO_URL} 
                      alt="S. SatheeshKumar Brand Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold">S. SatheeshKumar</h3>
                  <p className="text-xs text-[#1A7A8A] font-extrabold uppercase mt-1">
                    {currentTranslation.about_owner_badge}
                  </p>
                  <p className="text-xs text-gray-300 font-semibold bg-white/5 inline-block px-3 py-1 rounded-full mt-3">
                    DMLT., DXT.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accreditations:</span>
                    <span className="font-semibold text-right">CMC quality participant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Experience:</span>
                    <span className="font-semibold text-right">Diagnostic pathology specialist</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Consultation hours:</span>
                    <span className="font-semibold text-right text-green-400">Active 24 Hours</span>
                  </div>
                </div>

                {/* Call Out button */}
                <a 
                  href="tel:+919751504558"
                  className="w-full py-3 bg-[#1A7A8A] hover:bg-[#135E6B] text-white text-center font-bold text-xs rounded-lg shadow-md transition-all block flex items-center justify-center gap-2"
                >
                  {SVG_ICONS.phone("w-4 h-4 text-white")}
                  Direct consultation line
                </a>

              </div>

            </div>

          </div>
        )}

        {/* ================= PAGE: APPOINTMENTS ================= */}
        {page === 'appointments' && (
          <div className="max-w-7xl mx-auto py-12 px-6 fade-in">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Appointment Scheduling Form */}
              <div className="lg:col-span-8 bg-white p-6 lg:p-8 rounded-2xl border border-[#DCE8F5] shadow-sm">
                
                <h2 className="text-xl lg:text-3xl font-extrabold text-[#0A2342] mb-2 flex items-center gap-2">
                  {SVG_ICONS.stethoscope("w-7 h-7 text-[#1A7A8A]")}
                  {currentTranslation.appt_h2}
                </h2>
                <p className="text-xs text-[#4A5568] mb-6 leading-relaxed">
                  {currentTranslation.appt_desc}
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_fullname} *
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_phone} *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                        placeholder="9751504558"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Age */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_age}
                      </label>
                      <input 
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData(p => ({ ...p, age: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                        placeholder="35"
                      />
                    </div>

                    {/* Patient Gender */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_gender}
                      </label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                      >
                        <option value="Male">{currentTranslation.form_gender_m}</option>
                        <option value="Female">{currentTranslation.form_gender_f}</option>
                        <option value="Other">{currentTranslation.form_gender_o}</option>
                      </select>
                    </div>
                  </div>

                  {/* Appointment Type Location */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A2342] mb-1">
                      {currentTranslation.form_type}
                    </label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}
                      className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                    >
                      <option value="Walk-in">{currentTranslation.form_type_walkin}</option>
                      <option value="Home Collection">{currentTranslation.form_type_home}</option>
                    </select>
                  </div>

                  {/* Pre-Selected Test names (comes from calculator/cart) */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A2342] mb-1">
                      {currentTranslation.form_selection}
                    </label>
                    <input 
                      type="text"
                      value={formData.selectedTestName}
                      onChange={(e) => setFormData(p => ({ ...p, selectedTestName: e.target.value }))}
                      className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                      placeholder="e.g. Regular Health Package / Lipid Profile"
                    />
                    {bookedItems.length > 0 && (
                      <span className="text-[10px] text-green-500 font-bold block mt-1">
                        ✓ Loaded active selection list from your Estimator list!
                      </span>
                    )}
                  </div>

                  {/* Date & Time selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_date} *
                      </label>
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_time}
                      </label>
                      <input 
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))}
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                      />
                    </div>
                  </div>

                  {/* Home collection physical address (Shown conditionally) */}
                  {formData.type === 'Home Collection' && (
                    <div className="bg-[#E8F4FD] p-4 rounded-xl border border-[#DCE8F5] animate-fade-in">
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_address} *
                      </label>
                      <textarea 
                        required
                        rows="3"
                        value={formData.address}
                        onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                        className="w-full bg-white border border-[#DCE8F5] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                        placeholder="Door No, Street Name, Udumalaipettai"
                      ></textarea>
                    </div>
                  )}

                  {/* Notes / msg */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A2342] mb-1">
                      {currentTranslation.form_message}
                    </label>
                    <textarea 
                      rows="2"
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A7A8A]"
                      placeholder="Mention diabetic history or fasting details if any."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#1A7A8A] hover:bg-[#135E6B] text-white font-extrabold rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {currentTranslation.form_submit}
                  </button>

                </form>

              </div>

              {/* Side Info Cards */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-[#0A2342] text-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-base font-extrabold text-[#D4AF37] mb-3 flex items-center gap-1.5">
                    {SVG_ICONS.info("w-4 h-4 text-[#D4AF37]")}
                    {currentTranslation.appt_info_title}
                  </h3>
                  <ul className="space-y-4 text-xs">
                    <li className="flex items-start gap-2">
                      <div className="shrink-0 mt-0.5">
                        {SVG_ICONS.info("w-4 h-4 text-[#1A7A8A]")}
                      </div>
                      <p className="text-gray-300 leading-normal">{currentTranslation.appt_info_rule1}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="shrink-0 mt-0.5">
                        {SVG_ICONS.clock("w-4 h-4 text-[#1A7A8A]")}
                      </div>
                      <p className="text-gray-300 leading-normal">{currentTranslation.appt_info_rule2}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="shrink-0 mt-0.5">
                        {SVG_ICONS.phone("w-4 h-4 text-[#1A7A8A]")}
                      </div>
                      <p className="text-gray-300 leading-normal">{currentTranslation.appt_info_rule3}</p>
                    </li>
                  </ul>
                </div>

                {/* Direct support options */}
                <div className="bg-[#F7FBFF] p-6 rounded-2xl border border-[#DCE8F5]">
                  <h4 className="font-extrabold text-sm text-[#0A2342] mb-2">Need Instant Guidance?</h4>
                  <p className="text-xs text-gray-500 mb-4 leading-normal">
                    Call our live clinicians directly to choose which package is medically recommended for your symptoms.
                  </p>
                  <a href="tel:+919751504558" className="w-full py-2 bg-transparent border border-[#1A7A8A] hover:bg-[#1A7A8A]/10 text-[#1A7A8A] text-center font-bold text-xs rounded-lg transition-all block flex items-center justify-center gap-1">
                    {SVG_ICONS.phone("w-4 h-4 text-[#1A7A8A]")}
                    Call Clinical Desk
                  </a>
                </div>

              </div>

            </div>

            {/* Custom Interactive Booking Success Receipt Slip Modal */}
            {showSlip && generatedSlip && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#DCE8F5] animate-fade-in text-xs text-[#1A1A2E]">
                  
                  {/* Slip Header with Brand Logo */}
                  <div className="bg-[#0A2342] text-white p-5 text-center relative flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-white rounded-lg p-0.5 overflow-hidden shadow-md">
                      <img src={LOGO_URL} alt="Slip Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase mb-1">
                        Live Life Healthcare Lab
                      </div>
                      <h3 className="text-base font-extrabold">
                        {currentTranslation.form_success_title}
                      </h3>
                      <p className="text-[10px] text-gray-300 mt-1 max-w-xs mx-auto">
                        {currentTranslation.form_success_desc}
                      </p>
                    </div>
                  </div>

                  {/* Slip body */}
                  <div className="p-6 space-y-4">
                    
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-bold text-[#0A2342]">{currentTranslation.form_slip_booking_id}</span>
                      <span className="font-black text-[#1A7A8A]">{generatedSlip.id}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Patient:</span>
                        <span className="font-semibold text-[#0A2342]">{generatedSlip.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mobile:</span>
                        <span className="font-semibold text-[#0A2342]">{generatedSlip.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age / Gender:</span>
                        <span className="font-semibold text-[#0A2342]">{generatedSlip.age} Years • {generatedSlip.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{currentTranslation.form_slip_location}</span>
                        <span className="font-bold text-[#1A7A8A]">{generatedSlip.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Selected Diagnostics:</span>
                        <span className="font-semibold text-[#0A2342] text-right truncate max-w-xs">{generatedSlip.selectedItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Slot:</span>
                        <span className="font-semibold text-[#0A2342]">{generatedSlip.date} | {generatedSlip.time}</span>
                      </div>
                      
                      {generatedSlip.type === 'Home Collection' && (
                        <div className="bg-[#E8F4FD] p-2.5 rounded text-[11px] leading-relaxed border border-[#DCE8F5]">
                          <strong>Home dispatch location:</strong> {generatedSlip.address}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center text-sm font-black text-[#0A2342]">
                      <span>Estimated Bill Subtotal:</span>
                      <span className="text-lg text-[#27AE60]">₹{generatedSlip.totalAmount}</span>
                    </div>

                  </div>

                  {/* Close banner action */}
                  <div className="bg-gray-50 px-6 py-4 flex gap-3">
                    <button 
                      onClick={() => {
                        setShowSlip(false);
                        setBookedItems([]); // Clear calculator upon success
                      }}
                      className="w-full py-3 bg-[#0A2342] text-white hover:bg-black font-extrabold rounded-lg text-center transition-colors"
                    >
                      {currentTranslation.form_slip_close}
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= PAGE: FAQ ACCORDION ================= */}
        {page === 'faq' && (
          <div className="max-w-4xl mx-auto py-12 px-6 fade-in">
            
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#1A7A8A] uppercase tracking-widest bg-[#E8F4FD] px-3 py-1 rounded-full">
                Help & Answers
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0A2342] mt-3">
                Frequently Asked Clinical & Support Questions
              </h2>
            </div>

            {/* Accordion container */}
            <div className="space-y-4">
              {FAQS_DATA.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={faq.id} 
                    className="bg-white rounded-xl border border-[#DCE8F5] overflow-hidden transition-all shadow-sm"
                  >
                    {/* Accordion Header */}
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left font-bold text-sm text-[#0A2342] hover:text-[#1A7A8A] flex justify-between items-center transition-colors"
                    >
                      <span>{lang === 'ta' ? faq.qTa : faq.q}</span>
                      <span className="text-[#1A7A8A] font-extrabold text-lg">
                        {isOpen ? '−' : '＋'}
                      </span>
                    </button>

                    {/* Accordion Body with transition */}
                    {isOpen && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50 text-xs text-[#4A5568] leading-relaxed">
                        {lang === 'ta' ? faq.aTa : faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= PAGE: PATIENT GUIDE ================= */}
        {page === 'resources' && (
          <div className="max-w-4xl mx-auto py-12 px-6 fade-in">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#1A7A8A] uppercase tracking-widest bg-[#E8F4FD] px-3 py-1 rounded-full">
                Patient Resources
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0A2342] mt-3">
                {currentTranslation.guide_h2}
              </h2>
              <p className="text-xs text-gray-500 max-w-lg mx-auto mt-2 leading-relaxed">
                {currentTranslation.guide_intro}
              </p>
            </div>

            <div className="space-y-8">
              
              <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] space-y-3 shadow-sm">
                <h3 className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
                  {SVG_ICONS.info("w-5 h-5 text-[#1A7A8A]")}
                  {currentTranslation.guide_q1}
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed pl-7">
                  {currentTranslation.guide_a1}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] space-y-3 shadow-sm">
                <h3 className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
                  {SVG_ICONS.info("w-5 h-5 text-[#1A7A8A]")}
                  {currentTranslation.guide_q2}
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed pl-7">
                  {currentTranslation.guide_a2}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] space-y-3 shadow-sm">
                <h3 className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
                  {SVG_ICONS.info("w-5 h-5 text-[#1A7A8A]")}
                  {currentTranslation.guide_q3}
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed pl-7">
                  {currentTranslation.guide_a3}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCE8F5] space-y-3 shadow-sm">
                <h3 className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
                  {SVG_ICONS.sugar("w-5 h-5 text-[#1A7A8A]")}
                  {currentTranslation.guide_q4}
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed pl-7">
                  {currentTranslation.guide_a4}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ================= PAGE: CONTACT US ================= */}
        {page === 'contact' && (
          <div className="max-w-7xl mx-auto py-12 px-6 fade-in">
            
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0A2342]">
                {currentTranslation.contact_h2}
              </h2>
              <p className="text-xs text-[#4A5568] mt-2">
                {currentTranslation.contact_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              
              {/* Left Column: Direct Address cards */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Phones */}
                <div className="bg-[#F7FBFF] p-5 rounded-xl border border-[#DCE8F5] flex gap-4 items-start shadow-sm">
                  <div className="p-3 bg-[#E8F4FD] rounded-xl text-[#1A7A8A]">
                    {SVG_ICONS.phone("w-6 h-6 text-[#1A7A8A]")}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2342]">{currentTranslation.contact_phone_card}</h4>
                    <div className="space-y-1.5 mt-2 text-xs">
                      <a href="tel:+919751504558" className="block text-[#1A7A8A] font-extrabold hover:underline">
                        Primary: 9751504558
                      </a>
                      <a href="tel:+919751744558" className="block text-[#1A7A8A] font-extrabold hover:underline">
                        Secondary: 9751744558
                      </a>
                      <a href="tel:+918190004558" className="block text-[#1A7A8A] font-extrabold hover:underline">
                        Support: 8190004558
                      </a>
                    </div>
                  </div>
                </div>

                {/* Physical address */}
                <div className="bg-[#F7FBFF] p-5 rounded-xl border border-[#DCE8F5] flex gap-4 items-start shadow-sm">
                  <div className="p-3 bg-[#E8F4FD] rounded-xl text-[#1A7A8A]">
                    {SVG_ICONS.location("w-6 h-6 text-[#1A7A8A]")}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2342]">{currentTranslation.contact_address_card}</h4>
                    <p className="text-xs text-[#4A5568] leading-relaxed mt-2">
                      <strong>Live Life Healthcare Lab</strong><br />
                      14, Aarthi Complex,<br />
                      Opposite Lakshmi Thirumana Mandapam,<br />
                      Opposite Anushm Theatre, Kizhpuram,<br />
                      <strong>Udumalaipettai — 642 126</strong><br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="bg-[#F7FBFF] p-5 rounded-xl border border-[#DCE8F5] flex gap-4 items-start shadow-sm">
                  <div className="p-3 bg-[#E8F4FD] rounded-xl text-[#1A7A8A]">
                    {SVG_ICONS.clock("w-6 h-6 text-[#1A7A8A]")}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2342]">{currentTranslation.contact_hours_card}</h4>
                    <p className="text-xs text-[#4A5568] mt-2 leading-relaxed">
                      {currentTranslation.contact_hours_val}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Send msg form */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#DCE8F5] shadow-sm">
                <h3 className="text-base font-extrabold text-[#0A2342] mb-4">
                  {currentTranslation.contact_form_title}
                </h3>

                {contactSubmitted ? (
                  <div className="bg-[#27AE60]/10 border border-[#27AE60]/20 p-6 rounded-lg text-center text-[#27AE60]">
                    <span className="text-3xl block mb-2">✓</span>
                    <h4 className="font-bold text-sm">Message Transmitted Safely</h4>
                    <p className="text-xs text-gray-500 mt-1">Our clinical dispatch operator will dial your phone soon.</p>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.contact_form_name}
                      </label>
                      <input 
                        type="text"
                        required
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1A7A8A] text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.form_phone}
                      </label>
                      <input 
                        type="tel"
                        required
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1A7A8A] text-sm"
                        placeholder="9751504558"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A2342] mb-1">
                        {currentTranslation.contact_form_msg}
                      </label>
                      <textarea 
                        required
                        rows="4"
                        className="w-full bg-[#F7FBFF] border border-[#DCE8F5] rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#1A7A8A] text-sm"
                        placeholder="Any custom query about test schedules or prices..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#1A7A8A] hover:bg-[#135E6B] text-white font-extrabold rounded shadow-md transition-colors text-sm"
                    >
                      {currentTranslation.contact_form_btn}
                    </button>
                  </form>
                )}

              </div>

            </div>

            {/* Embedded interactive custom Styled Placeholder Map showing exact local landmarks in Udumalaipettai */}
            <div className="bg-[#E8F4FD] p-6 lg:p-8 rounded-2xl border border-[#DCE8F5] shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h3 className="text-base font-extrabold text-[#0A2342] flex items-center justify-center gap-1.5">
                  {SVG_ICONS.location("w-5 h-5 text-[#0A2342]")}
                  {currentTranslation.map_placeholder_label}
                </h3>
                <p className="text-xs text-[#4A5568] mt-1">
                  {currentTranslation.map_placeholder_hint}
                </p>
              </div>

              {/* Styled Mock map visual */}
              <div className="relative h-64 md:h-80 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-inner flex flex-col items-center justify-center">
                
                {/* Simulated Grid streets & pins */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#1A7A8A 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
                </div>

                {/* Major landmarks block visual */}
                <div className="relative text-center p-6 space-y-4 max-w-sm bg-white/95 backdrop-blur rounded-xl border border-[#DCE8F5] shadow-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1A7A8A]/10 text-[#1A7A8A] font-extrabold mb-2 animate-pulse">
                    {SVG_ICONS.location("w-6 h-6 text-[#1A7A8A]")}
                  </div>
                  <h4 className="font-extrabold text-xs text-[#0A2342]">Live Life Healthcare Lab</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Located on Highway Opp. Lakshmi Thirumana Mandapam, Udumalaipettai.
                  </p>
                  
                  <a 
                    href="https://maps.google.com/?q=Live+Life+Healthcare+Lab+Udumalaipettai" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-4 py-2.5 bg-[#27AE60] text-white hover:bg-[#219653] font-bold text-[10px] rounded transition-all shadow"
                  >
                    {currentTranslation.map_directions_btn}
                  </a>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* 5. IMMERSIVE COMPONENT FLOATING DIAL ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
        <a 
          href="tel:+919751504558"
          className="p-4 bg-[#27AE60] hover:bg-[#219653] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          title="Dial Lab Support"
        >
          {SVG_ICONS.phone("w-6 h-6 text-white animate-pulse")}
        </a>
      </div>

      {/* 6. GLOBAL FOOTER SYSTEM */}
      <footer className="bg-[#0A2342] text-white pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8 text-xs text-gray-300">
          
          {/* F1: Logo & cert block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-0.5 rounded-lg overflow-hidden shadow">
                <img src={LOGO_URL} alt="Footer Logo" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-white text-base font-extrabold uppercase tracking-wider">
                {currentTranslation.title}
              </h4>
            </div>
            <p className="leading-relaxed text-gray-400">
              {currentTranslation.tagline}<br />
              {currentTranslation.working_hours}
            </p>
            <div className="pt-2">
              <span className="text-[10px] text-gray-400 block mb-1">{currentTranslation.footer_cert_label}</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/15 text-[#D4AF37] font-bold rounded">
                {SVG_ICONS.shield("w-3.5 h-3.5 text-[#D4AF37]")}
                CMC Quality Programme
              </span>
            </div>
          </div>

          {/* F2: Address */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1">
              {SVG_ICONS.location("w-4 h-4 text-[#1A7A8A]")}
              {currentTranslation.footer_addr_label}
            </h5>
            <p className="leading-relaxed text-gray-400">
              14, Aarthi Complex,<br />
              Opposite Lakshmi Thirumana Mandapam,<br />
              Opposite Anushm Theatre, Kizhpuram,<br />
              <strong>Udumalaipettai — 642 126</strong><br />
              Tamil Nadu, India
            </p>
          </div>

          {/* F3: Quick Page links */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider">Useful Navigations</h5>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button onClick={() => setPage('home')} className="text-left hover:text-white transition-colors">Home</button>
              <button onClick={() => setPage('tests')} className="text-left hover:text-white transition-colors">Directory</button>
              <button onClick={() => setPage('about')} className="text-left hover:text-white transition-colors">Owner Profile</button>
              <button onClick={() => setPage('appointments')} className="text-left hover:text-white transition-colors">Appointments</button>
              <button onClick={() => setPage('faq')} className="text-left hover:text-white transition-colors">FAQ</button>
              <button onClick={() => setPage('resources')} className="text-left hover:text-white transition-colors">Patient Info</button>
            </div>
          </div>

          {/* F4: Hotlines */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1">
              {SVG_ICONS.phone("w-4 h-4 text-[#1A7A8A]")}
              24-Hour Hotlines
            </h5>
            <div className="space-y-2">
              <a href="tel:+919751504558" className="block text-[#1A7A8A] hover:underline font-extrabold text-sm">
                📞 9751504558
              </a>
              <a href="tel:+919751744558" className="block text-gray-400 hover:underline">
                📞 9751744558
              </a>
              <a href="tel:+918190004558" className="block text-gray-400 hover:underline">
                📞 8190004558
              </a>
            </div>
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4">
          <div>
            © 2026 Live Life Healthcare Lab, Udumalaipettai. {currentTranslation.footer_rights}
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Quality Assured System</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Fully Automated Counters</span>
          </div>
        </div>

      </footer>

    </div>
  );
}
