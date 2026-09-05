import { Activity, Bone, Brain, Heart, Stethoscope, Microscope, Waves } from 'lucide-react';
import { Service } from '@/types';

/**
 * The master catalog of all services offered by Malhotra Scanning Centre.
 * This array acts as the single source of truth for service details,
 * base pricing, and investigations.
 */
export const services: Service[] = [
  {
    id: 'ultrasound',
    title: 'Ultrasound & Sonography',
    description: 'Ultrasound imaging uses high-frequency sound waves to create real-time images of organs, soft tissues and developing pregnancies without ionising radiation.',
    icon: Waves,
    duration: '15-30 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹500',
    preparation: 'Preparation varies depending on the examination. Some abdominal/pelvic examinations may require fasting or a comfortably full bladder. Please confirm preparation requirements while booking.',
    whenAdvised: 'Ultrasound is commonly advised to evaluate abdominal pain, monitor fetal development, check the thyroid, or examine soft tissue structures.',
    investigations: [
      { name: 'Ultrasound Abdomen & Pelvis', price: '₹500–₹1,200' },
      { name: 'Comprehensive FWB / Fetal Well-Being Scan', price: '₹800–₹1,500' },
      { name: 'Ultrasound KUB', price: '₹500–₹900' },
      { name: 'TVS / TRUS', price: '₹1,000–₹1,800' },
      { name: 'Ovulation / Follicular Study', price: '₹1,000–₹2,000' },
      { name: 'Sonomammography / Breast Ultrasound', price: '₹800–₹1,500' },
      { name: 'Thyroid / Neck Ultrasound', price: '₹700–₹1,500' },
      { name: 'Orbit / Eye B-Scan', price: '₹1,000–₹2,000' },
      { name: 'Scrotum / Testes Ultrasound', price: '₹800–₹1,500' },
      { name: 'Musculoskeletal Ultrasound', price: '₹1,000–₹2,000' },
      { name: 'Neonatal Neurosonography', price: '₹800–₹2,000' },
    ]
  },
  {
    id: 'colour-doppler',
    title: 'Colour Doppler',
    description: 'Colour Doppler ultrasound evaluates blood flow through arteries and veins and can be used to assess circulation in different parts of the body.',
    icon: Heart,
    duration: '30-45 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹1,500',
    preparation: 'Usually no special preparation is required unless it involves abdominal vessels, which might require fasting. Please confirm with the centre when booking.',
    whenAdvised: 'Advised to detect blood clots, evaluate blood circulation, identify blocked arteries, or assess fetal blood flow during pregnancy.',
    investigations: [
      { name: 'Carotid Doppler', price: '₹1,500–₹2,500' },
      { name: 'Vascular Studies', price: '₹1,500–₹3,000' },
      { name: 'Lower Limb Doppler', price: '₹1,500–₹2,500 per limb' },
      { name: 'Upper Limb Doppler', price: '₹1,500–₹2,500 per limb' },
      { name: 'Liver / Portal System Doppler', price: '₹1,500–₹3,000' },
      { name: 'Kidney / Renal Doppler', price: '₹1,500–₹3,000' },
      { name: 'Gynaecology / Obstetrics Doppler', price: '₹1,500–₹3,000' },
      { name: 'Arterial Doppler', price: '₹1,500–₹2,500 per limb' },
      { name: 'Venous Doppler', price: '₹1,500–₹2,500 per limb' },
      { name: 'Arterial + Venous Doppler', price: '₹2,500–₹4,500 per limb' },
      { name: 'Fetal Doppler', price: '₹1,500–₹2,500' },
      { name: 'High Resolution 3D/4D Scan', price: '₹1,500–₹3,000' },
      { name: 'MCDI Scans', price: '₹1,500–₹3,500' },
      { name: 'Head / Face / Chest / Whole Body Doppler', price: '₹1,500–₹4,000+' },
    ]
  },
  {
    id: 'digital-xray',
    title: 'Digital X-Ray',
    description: 'Digital radiography provides rapid X-ray imaging for bones, chest and other anatomical regions.',
    icon: Bone,
    duration: '10-20 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹200',
    preparation: 'Wear loose, comfortable clothing. You may be asked to remove jewelry, eyeglasses and any metal objects. For special contrast studies, contact the centre for preparation instructions.',
    whenAdvised: 'Typically advised to diagnose fractures, joint dislocations, chest infections, or spinal conditions.',
    investigations: [
      { name: 'Chest X-Ray', price: '₹200–₹400' },
      { name: 'Abdomen X-Ray', price: '₹250–₹500' },
      { name: 'KUB X-Ray', price: '₹250–₹500' },
      { name: 'Skull X-Ray', price: '₹300–₹600' },
      { name: 'Spine X-Ray', price: '₹300–₹700' },
      { name: 'Joint / Limb X-Ray', price: '₹250–₹600' },
      { name: 'Whole Spine X-Ray', price: '₹500–₹1,200' },
      { name: 'Whole Limb X-Ray', price: '₹500–₹1,200' },
      { name: 'Digital IVP', price: '₹2,500–₹3,500', isSpecial: true },
      { name: 'Digital Barium Studies', price: '₹2,000–₹4,000+', isSpecial: true },
      { name: 'Digital RGU', price: '₹2,500–₹3,500', isSpecial: true },
      { name: 'Digital MCU', price: '₹2,500–₹4,000', isSpecial: true },
      { name: 'Digital RGU + MCU', price: '₹4,000–₹6,000', isSpecial: true },
      { name: 'Digital Sinogram', price: '₹2,000–₹3,500', isSpecial: true },
      { name: 'Digital HSG', price: '₹2,500–₹5,000', isSpecial: true },
    ]
  },
  {
    id: 'ct-scan',
    title: 'CT Scan',
    description: 'Computed tomography combines multiple X-ray images to create detailed cross-sectional views of the body.',
    icon: Brain,
    duration: '15-45 mins',
    report: 'Next Day',
    priceSummary: 'Starting from ₹1,500',
    preparation: 'Preparation varies depending on the type of scan. Contrast scans require fasting for 4-6 hours and recent kidney function test (Creatinine) reports. Please confirm exact requirements when booking.',
    whenAdvised: 'Advised for detailed imaging of the brain, chest, abdomen, or complex bone fractures. It provides far more detail than a standard X-Ray.',
    investigations: [
      { name: 'CT Brain / Head', price: '₹1,500–₹3,000' },
      { name: 'CT Body Region', price: '₹2,000–₹5,000+' },
      { name: 'CT with Contrast', price: '₹3,000–₹7,000+' },
      { name: 'CT Whole Body', price: '₹5,000–₹10,000+' },
    ]
  },
  {
    id: 'fetal-imaging',
    title: 'Fetal Imaging',
    description: 'Imaging examinations during pregnancy may be used to assess fetal growth, anatomy and well-being at different stages of pregnancy.',
    icon: Stethoscope,
    duration: '20-45 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹800',
    preparation: 'Usually no specific preparation is required, but a comfortably full bladder may be needed for early pregnancy scans. Confirm when booking.',
    whenAdvised: 'Advised during pregnancy to monitor fetal growth, detect anomalies, check the position of the placenta, and ensure overall fetal well-being.',
    investigations: [
      { name: 'Fetal Well-Being Scan', price: '₹800–₹1,500' },
      { name: 'Obstetric / Fetal Doppler', price: '₹1,500–₹2,500' },
      { name: 'Basic Fetal Scan', price: '₹1,000–₹1,500' },
      { name: 'Level II / Anomaly Scan', price: '₹2,000–₹3,000' },
      { name: '3D / 4D Fetal Scan', price: '₹1,500–₹3,000' },
    ]
  },
  {
    id: 'cardiac-diagnostics',
    title: 'Cardiac Diagnostics',
    description: 'Diagnostic cardiac investigations help evaluate the structure and function of the heart.',
    icon: Heart,
    duration: '20-40 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹1,000',
    preparation: 'No specific preparation is required. Wear loose, comfortable clothing for easy access to the chest area.',
    whenAdvised: 'Commonly advised to evaluate heart murmurs, investigate chest pain, check pumping function, or assess damage after a heart attack.',
    investigations: [
      { name: '2D Echocardiography / ECHO', price: '₹1,000–₹2,000' },
      { name: 'Advanced / 3D Echo', price: '₹3,000–₹10,000' },
    ]
  },
  {
    id: 'ecg-eeg',
    title: 'ECG & EEG',
    description: 'Electrodiagnostic investigations used to record electrical activity associated with the heart and brain.',
    icon: Activity,
    duration: '10-45 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹150',
    preparation: 'Preparation depends on the examination. Confirm instructions during booking.',
    whenAdvised: 'ECG is advised to check the heart rhythm and electrical activity. EEG is advised to detect electrical abnormalities in the brain, such as in epilepsy.',
    investigations: [
      { name: 'ECG', price: '₹150–₹400' },
      { name: 'EEG', price: '₹800–₹1,500' },
    ]
  },
  {
    id: 'fibroscan',
    title: 'FibroScan',
    description: 'FibroScan is a non-invasive examination used to assess liver stiffness and related liver measurements.',
    icon: Activity,
    duration: '10-15 mins',
    report: 'Same Day',
    priceSummary: 'Starting from ₹1,500',
    preparation: 'Fasting for at least 2-3 hours is usually required. Follow the centre\'s specific instructions regarding fasting.',
    whenAdvised: 'Advised to assess the degree of liver fibrosis or cirrhosis, often in patients with fatty liver disease, hepatitis, or alcohol-related liver conditions.',
    investigations: [
      { name: 'FibroScan / Liver Stiffness Scan', price: '₹1,500–₹2,500' },
    ]
  },
  {
    id: 'laboratory',
    title: 'Laboratory Investigations',
    description: 'Routine laboratory investigations may support diagnostic evaluation alongside imaging services.',
    icon: Microscope,
    duration: '5-10 mins',
    report: 'Varies',
    priceSummary: 'Price on enquiry',
    preparation: 'Many blood tests (like fasting blood sugar, lipid profile) require 8-12 hours of fasting. Please confirm during booking.',
    whenAdvised: 'Advised by doctors for routine health checkups, diagnosing infections, monitoring chronic conditions, and general wellness assessment.',
    investigations: [
      { name: 'Routine Blood Tests', price: 'Price on enquiry' },
      { name: 'Urine Tests', price: 'Price on enquiry' },
      { name: 'Other Diagnostic Laboratory Investigations', price: 'Price on enquiry' },
    ]
  }
];

/**
 * Retrieves a service by its unique slug/id.
 * 
 * @param slug - The unique identifier of the service (e.g. 'ultrasound')
 * @returns The matching Service object, or undefined if not found
 */
export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(s => s.id === slug);
};
