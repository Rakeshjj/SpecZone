import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, BookOpen, Clock, ChevronRight, Share2, Sparkles } from "lucide-react";
import { Article } from "../types";
import ArticleDetailView from "./ArticleDetailView";
import conjunctivitisImg from "../assets/images/conjunctivitis_clinical_eye_1789728542481.jpg";
import eyeAllergyImg from "../assets/images/eye_allergy_clinical_eye_1789728832728.jpg";
import eyeInjuryImg from "../assets/images/eye_injury_clinical_1789729112817.jpg";
import blepharitisImg from "../assets/images/blepharitis_clinical_1789729128898.jpg";
import myopiaDiseaseImg from "../assets/images/myopia_disease_diagram_1789639790465.jpg";
import hyperopiaDiseaseImg from "../assets/images/hyperopia_disease_diagram_1789639808308.jpg";
import astigmatismDiseaseImg from "../assets/images/astigmatism_disease_diagram_1789639821383.jpg";
import presbyopiaDiseaseImg from "../assets/images/presbyopia_disease_diagram_1789639841630.jpg";

const ARTICLES_DATA: Article[] = [
  {
    id: 1,
    title: "Myopia (Short-sightedness)",
    subtitle: "Refractive Error Clinical Overview",
    category: "Clinical Eye Care",
    readTime: "4 min read",
    date: "July 15, 2026",
    thumbnail: myopiaDiseaseImg,
    summary: "A person can see near objects clearly but distant objects appear blurred.",
    clinicalDetails: {
      definition: "A person can see near objects clearly but distant objects appear blurred.",
      causes: [
        "Eyeball is too long (axial myopia).",
        "Cornea or lens has excessive refractive power."
      ],
      symptoms: [
        "Blurred distance vision.",
        "Squinting to see distant objects.",
        "Eye strain.",
        "Headache."
      ],
      treatments: [
        "Concave (minus) lens.",
        "Contact lenses.",
        "Refractive surgery in suitable adults."
      ]
    },
    content: [
      "Myopia, commonly known as short-sightedness or near-sightedness, is one of the most widespread refractive conditions in the modern optical world. Individuals experiencing myopia enjoy sharp focus when observing nearby digital screens or reading literature, while distant street signs, presentation boards, or road signs appear noticeably blurred.",
      "From an optical physics standpoint, incoming parallel light rays do not focus cleanly on the retinal photoreceptors. Instead, they converge at an early focal plane in front of the retina. This typically occurs because the eyeball's physical axial length is excessively long, or because the curvature of the cornea and crystalline lens bends incoming light with excessive refractive power.",
      "Correction is achieved using concave (minus) lenses, which gently diverge incoming light rays prior to entering the pupil, displacing the optical focus backward directly onto the retina. Modern clinical advancements—including customized wavefront lenses, orthokeratology, and refractive laser correction in eligible adults—provide crisp, high-definition visual resolution and fatigue relief."
    ]
  },
  {
    id: 2,
    title: "Hyperopia (Long-sightedness)",
    subtitle: "Focusing Power Deficit Overview",
    category: "Clinical Eye Care",
    readTime: "4 min read",
    date: "July 18, 2026",
    thumbnail: hyperopiaDiseaseImg,
    summary: "The eye has insufficient focusing power, often making near vision difficult. Some people may have clear distance vision, especially when young.",
    clinicalDetails: {
      definition: "The eye has insufficient focusing power, often making near vision difficult. Some people may have clear distance vision, especially when young.",
      causes: [
        "Eyeball is too short.",
        "Cornea or lens has insufficient refractive power."
      ],
      symptoms: [
        "Near vision difficulty.",
        "Eye strain.",
        "Headache after reading.",
        "Blurred vision, particularly at near."
      ],
      treatments: [
        "Convex (plus) lens.",
        "Contact lenses.",
        "Refractive surgery in selected patients."
      ]
    },
    content: [
      "Hyperopia, commonly termed long-sightedness or far-sightedness, is an optical refractive state wherein the eye possesses inadequate natural focusing power. When parallel rays of light enter an unaccommodated hyperopic eye, they project toward a theoretical focal plane located behind the sensory retina instead of focusing directly upon it.",
      "This insufficient convergence occurs either because the physical axial length of the eyeball is too short, or because the refractive curvatures of the cornea and crystalline lens lack sufficient optical power. In younger individuals, constant muscular accommodation by the ciliary body can sometimes overcome mild hyperopia for distance, but this continuous exertion leads to severe eye strain, asthenopia, and frontal headaches after prolonged reading.",
      "Optical management focuses on convex (plus) lenses. Convex lenses converge light rays prior to their entrance into the eye, drawing the focal plane smoothly forward directly onto the retina. Corrective treatment options include precision-crafted convex spectacles, daily and monthly contact lenses, and refractive laser surgery for selected eligible adult patients."
    ]
  },
  {
    id: 3,
    title: "Astigmatism",
    subtitle: "Corneal & Lenticular Curvature Asymmetry",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "July 22, 2026",
    thumbnail: astigmatismDiseaseImg,
    summary: "The cornea or lens has different refractive powers in different meridians, causing light to focus at different points rather than one point.",
    clinicalDetails: {
      definition: "The cornea or lens has different refractive powers in different meridians, causing light to focus at different points rather than one point.",
      causes: [
        "Irregular or unequal corneal curvature.",
        "Lenticular astigmatism.",
        "Corneal conditions such as keratoconus."
      ],
      symptoms: [
        "Blurred vision at distance and near.",
        "Distorted vision.",
        "Headache.",
        "Eye strain."
      ],
      treatments: [
        "Cylindrical or sphero-cylindrical spectacles.",
        "Toric contact lenses.",
        "Refractive surgery in suitable patients.",
        "Specialty contact lenses for irregular astigmatism."
      ]
    },
    content: [
      "Astigmatism is an asymmetrical refractive condition where the front surface of the cornea or the intraocular crystalline lens exhibits unequal curvature across its various meridians—resembling the oblong profile of an American football or rugby ball rather than a uniform spherical soccer ball.",
      "Because light traversing different meridians is refracted at varying degrees of steepness, incoming rays cannot focus at a single, unified focal point. Instead, multiple focal points or focal lines form either in front of, within, or behind the retina. This optical distortion causes image ghosting, shadowing, and visual blurring across both near reading tasks and long-distance horizons.",
      "Correction requires cylindrical or sphero-cylindrical optical lenses ground with specific directional axes to equalize refractive power across all meridians. Modern management pathways include digital free-form cylindrical lenses, stabilized toric contact lenses, specialized scleral and rigid gas-permeable (RGP) lenses for keratoconus, and customized topography-guided refractive procedures."
    ]
  },
  {
    id: 4,
    title: "Presbyopia",
    subtitle: "Age-Related Accommodative Evolution",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "July 25, 2026",
    thumbnail: presbyopiaDiseaseImg,
    summary: "An age-related reduction in the eye’s ability to focus on near objects, usually noticeable around 40–45 years.",
    clinicalDetails: {
      definition: "An age-related reduction in the eye’s ability to focus on near objects.",
      causes: [
        "Reduced lens elasticity.",
        "Changes in accommodation with age."
      ],
      note: "Usually becomes noticeable around 40–45 years, although the age varies.",
      symptoms: [
        "Difficulty reading small print.",
        "Holding books farther away.",
        "Need for brighter light.",
        "Near vision blur."
      ],
      treatments: [
        "Reading glasses.",
        "Bifocal glasses.",
        "Progressive addition lenses.",
        "Multifocal contact lenses."
      ],
      example: "Distance prescription +1.00 DS, near addition +1.50 D."
    },
    content: [
      "Presbyopia is a natural, universal physiological aging process affecting the ocular accommodation system. Beginning noticeably between ages 40 and 45, the natural crystalline lens within the eye gradually loses its innate elasticity, while the surrounding ciliary muscle mechanics experience natural alterations in accommodative amplitude.",
      "Consequently, the crystalline lens can no longer dynamically steepen its curvature to provide sufficient focal power for close-up tasks. Individuals experience typical compensatory habits, such as pushing smartphones, newspapers, and fine print farther away toward arm's length or seeking significantly brighter ambient illumination.",
      "Presbyopic optical correction has reached extraordinary precision. Beyond traditional reading glasses and segmented bifocals, modern digital progressive addition lenses (PALs) provide a seamless, invisible gradient of power covering distance, intermediate computer screens, and close reading zones without visual jump. Prescriptions are tailored with precision near-additions (e.g., Distance prescription +1.00 DS with a near addition of +1.50 D) and multifocal contact lenses."
    ]
  },
  {
    id: 5,
    title: "Cataract",
    subtitle: "Crystalline Lens Opacification & Clinical Management",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "July 10, 2026",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    summary: "A cataract is the clouding of the natural crystalline lens of the eye. It prevents light from passing clearly to the retina and causes blurred vision.",
    clinicalDetails: {
      definition: "A cataract is the clouding of the natural crystalline lens of the eye. It prevents light from passing clearly to the retina and causes blurred vision.",
      causes: [
        "Age: The most common cause.",
        "Diabetes mellitus.",
        "Eye injury or trauma.",
        "Long-term steroid use.",
        "Previous eye surgery.",
        "Excessive exposure to ultraviolet radiation.",
        "Smoking.",
        "Congenital or childhood conditions."
      ],
      symptoms: [
        "Blurred or cloudy vision.",
        "Difficulty seeing at night.",
        "Glare from headlights or bright lights.",
        "Halos around lights.",
        "Faded or yellowish colors.",
        "Frequent changes in spectacle power.",
        "Double vision in one eye.",
        "Reduced visual acuity."
      ],
      clinicalSigns: [
        "Reduced visual acuity.",
        "Lens opacity on slit-lamp examination.",
        "Reduced red reflex.",
        "Possible improvement or worsening of vision depending on the cataract type."
      ],
      typesTable: [
        { type: "Nuclear cataract", description: "Opacity in the central nucleus of the lens" },
        { type: "Cortical cataract", description: "Opacity in the lens cortex, often spoke-like" },
        { type: "Posterior subcapsular cataract", description: "Opacity near the back of the lens" },
        { type: "Congenital cataract", description: "Present at birth or develops during childhood" },
        { type: "Traumatic cataract", description: "Develops after eye injury" }
      ],
      treatments: [
        "Early stage: Update spectacle prescription, improve lighting, sunglasses with UV protection.",
        "Regular monitoring: Control diabetes and systemic risk factors.",
        "Advanced cataract: Definitive treatment is cataract surgery."
      ],
      earlyStageTreatment: [
        "Update spectacle prescription if it improves vision.",
        "Improve lighting for reading.",
        "Use sunglasses with UV protection.",
        "Control diabetes and other risk factors.",
        "Regular eye examinations."
      ],
      treatmentWarning: "There are no proven eye drops or medicines that reverse an established cataract.",
      advancedTreatment: "The definitive treatment is cataract surgery"
    },
    content: [
      "A cataract is the clouding of the natural crystalline lens of the eye. It prevents light from passing clearly to the retina and causes blurred vision.",
      "In a healthy eye, the crystalline lens is transparent and flexible, focusing light rays with optical clarity onto the sensory retina. As a cataract progresses, metabolic proteins within the lens denature and clump together, causing light scattering, reduced contrast sensitivity, and significant visual haziness.",
      "While early-stage visual decline can sometimes be managed with updated refractive spectacles, improved ambient reading illumination, and UV protection, established cataracts cannot be dissolved or reversed with medication. Cataract surgery—involving precision ultrasonic phacoemulsification and replacement with a custom intraocular lens (IOL)—remains the standard of care worldwide."
    ]
  },
  {
    id: 6,
    title: "Glaucoma",
    subtitle: "Optic Neuropathy, IOP Dynamics & Tonometric Assessment",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "June 28, 2026",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    summary: "Glaucoma is progressive damage to the optic nerve, commonly associated with elevated IOP, leading to visual field loss.",
    clinicalDetails: {
      definition: "Glaucoma is progressive damage to the optic nerve, commonly associated with elevated IOP, leading to visual field loss.",
      note: "Important: Glaucoma can occur even when IOP is within the statistically normal range.",
      mechanism: "The eye produces aqueous humor, which normally drains through the trabecular meshwork and Schlemm’s canal. When drainage is reduced, aqueous humor accumulates, increasing IOP and potentially damaging the optic nerve.",
      causes: [
        "Increasing age.",
        "Family history of glaucoma.",
        "Raised IOP (Intraocular Pressure).",
        "Diabetes mellitus.",
        "High myopia.",
        "Long-term corticosteroid use.",
        "Previous eye trauma.",
        "Thin central corneal thickness."
      ],
      symptoms: [
        "Primary open-angle glaucoma: Usually develops slowly, often no symptoms in early stages, progressive peripheral visual field loss, difficulty seeing in advanced stages.",
        "Acute angle-closure glaucoma: Sudden severe eye pain, red eye, blurred vision, halos around lights, headache, nausea and vomiting.",
        "Important: Patients may not notice glaucoma until significant vision has been lost."
      ],
      emergencyAlert: "Acute angle-closure glaucoma is an ophthalmic emergency requiring immediate medical treatment.",
      clinicalSigns: [
        "Increased IOP.",
        "Optic disc cupping.",
        "Reduced neuroretinal rim.",
        "Retinal nerve fiber layer thinning.",
        "Visual field defects.",
        "Gonioscopy findings.",
        "Asymmetry between the two eyes."
      ],
      investigations: [
        "Tonometry: Measures IOP.",
        "Gonioscopy: Assesses the anterior chamber angle.",
        "Optic nerve head examination.",
        "OCT RNFL and ganglion cell analysis.",
        "Automated perimetry.",
        "Pachymetry: Measures central corneal thickness."
      ],
      treatments: [
        "Main goal: Prevent or slow further optic nerve damage by lowering IOP.",
        "Medication (Eye drops): Targeted drops to reduce production or increase outflow.",
        "Laser treatment: SLT, Laser peripheral iridotomy, Cyclophotocoagulation.",
        "Surgery: Trabeculectomy, Glaucoma drainage devices, MIGS."
      ],
      medicationsTable: [
        { medication: "Prostaglandin analogues", action: "Increase uveoscleral outflow" },
        { medication: "Beta blockers", action: "Reduce aqueous humor production" },
        { medication: "Alpha-2 agonists", action: "Reduce aqueous production and increase outflow" },
        { medication: "Carbonic anhydrase inhibitors", action: "Reduce aqueous production" },
        { medication: "Rho kinase inhibitors", action: "Increase trabecular outflow" }
      ],
      laserTreatments: [
        "Selective laser trabeculoplasty (SLT): Used for suitable open-angle glaucoma.",
        "Laser peripheral iridotomy: Commonly used to treat or prevent angle closure in appropriate eyes.",
        "Cyclophotocoagulation: Used in selected difficult-to-control cases."
      ],
      surgicalTreatments: [
        "Trabeculectomy.",
        "Glaucoma drainage device implantation.",
        "Minimally invasive glaucoma surgery (MIGS) in selected patients."
      ]
    },
    content: [
      "Glaucoma is progressive damage to the optic nerve, commonly associated with elevated intraocular pressure (IOP), leading to visual field loss.",
      "The eye produces aqueous humor, which normally drains through the trabecular meshwork and Schlemm’s canal. When drainage is reduced, aqueous humor accumulates, increasing IOP and potentially damaging the optic nerve. Glaucoma can also occur when IOP is within the statistically normal range (normal-tension glaucoma).",
      "Because primary open-angle glaucoma develops painlessly with silent peripheral field loss, regular tonometry, OCT scans, and automated perimetry are vital for early clinical detection and vision preservation."
    ]
  },
  {
    id: 7,
    title: "Diabetic Retinopathy",
    subtitle: "Retinal Microvascular Disease, Clinical Staging & Management",
    category: "Clinical Eye Care",
    readTime: "6 min read",
    date: "June 14, 2026",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    summary: "Diabetic retinopathy is damage to retinal blood vessels caused by diabetes mellitus. Chronic high blood glucose causes leakage, capillary occlusion, and abnormal neovascularization.",
    clinicalDetails: {
      definition: "Diabetic retinopathy is damage to the retinal blood vessels caused by diabetes mellitus. High blood glucose over time damages small retinal vessels, leading to leakage, blockage, and abnormal blood vessel growth.",
      note: "Important: A patient can have serious diabetic retinopathy even when vision is still good.",
      causes: [
        "Poor blood glucose control (chronic hyperglycemia).",
        "Long duration of diabetes.",
        "High blood pressure (hypertension).",
        "High cholesterol (dyslipidemia).",
        "Pregnancy in a person with diabetes.",
        "Kidney disease (diabetic nephropathy).",
        "Smoking."
      ],
      symptoms: [
        "Blurred vision.",
        "Floaters.",
        "Dark spots or shadows in visual field.",
        "Difficulty seeing at night.",
        "Reduced color vision.",
        "Sudden vision loss in severe cases.",
        "Note: May have no symptoms in early stages."
      ],
      stages: [
        {
          stage: "Mild NPDR",
          category: "Non-Proliferative Diabetic Retinopathy (NPDR)",
          description: "Early stage where retinal blood vessels become damaged without abnormal new vessel growth.",
          features: ["Microaneurysms."]
        },
        {
          stage: "Moderate NPDR",
          category: "Non-Proliferative Diabetic Retinopathy (NPDR)",
          description: "Progressive retinal capillary damage and localized ischemia.",
          features: [
            "More microaneurysms.",
            "Retinal hemorrhages (dot-blot).",
            "Hard exudates (lipid leakage).",
            "Cotton-wool spots (nerve fiber ischemia).",
            "Venous changes may occur."
          ]
        },
        {
          stage: "Severe NPDR",
          category: "Non-Proliferative Diabetic Retinopathy (NPDR)",
          description: "Extensive retinal ischemia indicating high risk of progression to proliferative stage.",
          features: [
            "Extensive hemorrhages and microaneurysms.",
            "Venous beading.",
            "Intraretinal microvascular abnormalities (IRMA)."
          ]
        },
        {
          stage: "Proliferative Diabetic Retinopathy (PDR)",
          category: "Proliferative Disease (Advanced Stage)",
          description: "Retinal ischemia induces abnormal, fragile new blood vessels to grow on the retina or optic disc.",
          complications: [
            "Vitreous hemorrhage.",
            "Tractional retinal detachment.",
            "Neovascular glaucoma.",
            "Severe vision loss."
          ]
        },
        {
          stage: "Diabetic Macular Edema (DME)",
          category: "Macular Complication",
          description: "DME occurs when fluid leaks into the macula, causing retinal thickening and reduced central vision. It can occur at any stage of diabetic retinopathy."
        }
      ],
      clinicalSignsTable: [
        { sign: "Microaneurysms", meaning: "Earliest visible clinical sign" },
        { sign: "Dot-blot hemorrhages", meaning: "Retinal vascular damage" },
        { sign: "Hard exudates", meaning: "Lipid leakage" },
        { sign: "Cotton-wool spots", meaning: "Retinal nerve fiber layer ischemia" },
        { sign: "Venous beading", meaning: "Severe NPDR feature" },
        { sign: "IRMA", meaning: "Severe retinal ischemia" },
        { sign: "Neovascularization", meaning: "Proliferative diabetic retinopathy" },
        { sign: "Macular edema", meaning: "Fluid accumulation in the macula" }
      ],
      investigations: [
        "Visual acuity: Baseline visual acuity measurement.",
        "Dilated fundus examination: Full peripheral and posterior evaluation.",
        "Slit-lamp fundus examination: High-magnification stereoscopic retinal exam.",
        "Optical coherence tomography (OCT): Quantitative assessment for macular edema.",
        "Fundus photography: Color documentation and serial progression tracking.",
        "Fluorescein angiography: Evaluates capillary non-perfusion, leakage, and ischemia when indicated.",
        "OCT angiography: Rapid, non-invasive microvascular mapping in selected cases."
      ],
      treatments: [
        "Systemic management: Optimal glycemic, blood pressure, and lipid control.",
        "Intravitreal injections: Anti-VEGF agents for DME and proliferative disease.",
        "Laser treatment: Panretinal photocoagulation (PRP) and focal/grid laser.",
        "Vitrectomy: Surgery for non-clearing hemorrhage or retinal detachment."
      ],
      systemicManagement: [
        "Blood glucose management.",
        "Blood pressure control.",
        "Cholesterol management.",
        "Regular diabetic eye examinations.",
        "Systemic control helps reduce the risk of progression, but it does not replace retinal treatment when needed."
      ],
      injections: {
        category: "Intravitreal Injections (Anti-VEGF)",
        medications: ["Ranibizumab", "Aflibercept", "Bevacizumab"],
        action: "These medicines reduce abnormal vascular leakage and pathological new blood vessel growth."
      },
      laserTreatments: [
        "Panretinal photocoagulation (PRP): Used mainly for proliferative diabetic retinopathy to reduce retinal ischemia and the risk of severe complications.",
        "Focal/grid laser: May be used in selected cases of diabetic macular edema."
      ],
      surgicalTreatments: [
        "Non-clearing vitreous hemorrhage.",
        "Tractional retinal detachment involving or threatening the macula.",
        "Other severe proliferative complications."
      ]
    },
    content: [
      "Diabetic retinopathy is damage to the retinal blood vessels caused by diabetes mellitus. High blood glucose over time damages small retinal vessels, leading to leakage, blockage, and abnormal blood vessel growth.",
      "The disease advances through non-proliferative stages (mild, moderate, and severe NPDR characterized by microaneurysms, hemorrhages, hard exudates, and IRMA) to proliferative diabetic retinopathy (PDR), where retinal ischemia triggers fragile neovascularization. Diabetic macular edema (DME) can manifest at any stage.",
      "Effective clinical care integrates systemic glycemic and hypertensive management, routine dilated examinations with OCT, intravitreal anti-VEGF pharmacotherapy (Ranibizumab, Aflibercept, Bevacizumab), panretinal laser photocoagulation, and vitrectomy when surgery is indicated."
    ]
  },
  {
    id: 8,
    title: "Dry Eye Syndrome: Types, Causes, Diagnosis & Advanced Management",
    category: "Clinical Optometry",
    readTime: "5 min read",
    date: "June 02, 2026",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    summary: "A clinical guide to dry eye disease: aqueous-deficient and evaporative mechanisms, symptoms, diagnostic tests (TBUT, Schirmer), and step-wise management.",
    clinicalDetails: {
      definition: "Dry eye disease is a condition in which the tears are insufficient or evaporate too quickly, causing discomfort and damage to the ocular surface.",
      typesTable: [
        { type: "Aqueous-deficient dry eye", description: "Reduced tear production from the lacrimal glands." },
        { type: "Evaporative dry eye", description: "Excessive tear evaporation, commonly due to meibomian gland dysfunction (MGD)." },
        { type: "Mixed dry eye", description: "Both reduced tear production and excessive evaporation mechanisms are present." }
      ],
      causes: [
        "Aqueous-deficient: Age-related reduction in tear production, Sjögren syndrome, autoimmune diseases, lacrimal gland disorders, and medications (antihistamines, antidepressants).",
        "Evaporative: Meibomian gland dysfunction (MGD), blepharitis, prolonged screen use with reduced blinking, contact lens wear, and air conditioning/fans/dry wind.",
        "Other risk factors: Increasing age, female sex (especially with hormonal changes), previous ocular surgery, smoking, and environmental irritants."
      ],
      symptoms: [
        "Dryness, burning, or stinging sensation.",
        "Gritty or sandy feeling in the eyes.",
        "Redness and foreign body sensation.",
        "Intermittent blurred vision and eye fatigue.",
        "Excessive watering (reflex tears) and light sensitivity."
      ],
      note: "Excessive watering can occur because ocular surface irritation triggers reflex tears.",
      clinicalSigns: [
        "Reduced tear meniscus height.",
        "Rapid tear breakup time (TBUT < 10s).",
        "Corneal fluorescein staining (epithelial damage).",
        "Conjunctival staining.",
        "Meibomian gland dysfunction (capping, altered meibum).",
        "Lid margin inflammation and redness.",
        "Reduced blink rate during visual tasks.",
        "Bulbar and palpebral conjunctival redness."
      ],
      investigationsTable: [
        { test: "TBUT", purpose: "Assesses tear film stability" },
        { test: "Schirmer test", purpose: "Measures aqueous tear production" },
        { test: "Fluorescein staining", purpose: "Detects corneal epithelial damage" },
        { test: "Tear meniscus assessment", purpose: "Estimates tear volume" },
        { test: "Meibomian gland evaluation", purpose: "Assesses evaporative dry eye" },
        { test: "Ocular surface examination", purpose: "Identifies associated disease" }
      ],
      treatments: [
        "Artificial tears: First-line tear replacement lubricants (preservative-free preferred for frequent use).",
        "Lifestyle & environmental modifications: Regular screen breaks, full blinking, humidification, and hydration.",
        "Meibomian gland dysfunction protocol: Warm compresses, gentle lid massage, lid hygiene, and blepharitis care.",
        "Prescription anti-inflammatory therapy: Cyclosporine drops, lifitegrast, and short-course topical corticosteroids.",
        "Procedural interventions: Punctal occlusion plugs to conserve natural tears when appropriate."
      ],
      earlyStageTreatment: [
        "Carboxymethylcellulose lubricants.",
        "Hypromellose eye drops.",
        "Sodium hyaluronate lubricating solutions.",
        "Preservative-free drops are often preferred when frequent application is needed."
      ],
      lifestyleChanges: [
        "Take regular breaks during screen use (e.g., 20-20-20 rule).",
        "Blink fully and frequently.",
        "Avoid direct fan or air-conditioner airflow.",
        "Use a humidifier in dry environments.",
        "Stay hydrated throughout the day.",
        "Avoid smoking and eye irritants."
      ],
      mgdTreatment: [
        "Warm compresses applied for 5–10 minutes.",
        "Gentle eyelid massage toward lid margins.",
        "Lid hygiene with dedicated cleansers.",
        "Treatment of associated blepharitis.",
        "Prescription medications in selected cases."
      ],
      prescriptionTreatment: [
        "Cyclosporine eye drops.",
        "Lifitegrast ophthalmic solution.",
        "Short courses of topical corticosteroids in selected cases.",
        "Punctal plugs to conserve ocular tear volume when appropriate."
      ]
    },
    content: [
      "Dry eye disease is a condition in which tears are insufficient or evaporate too quickly, causing ocular surface discomfort, inflammation, and potential epithelial damage. Tears play an essential optical and physiological role, providing a smooth refractive surface and antibacterial defense.",
      "The clinical spectrum is categorized into aqueous-deficient dry eye (often associated with aging, Sjögren syndrome, systemic autoimmune disorders, and medication use), evaporative dry eye (frequently driven by meibomian gland dysfunction and decreased blink rates during screen work), and mixed forms where both mechanisms contribute.",
      "Optometric management begins with thorough slit-lamp evaluation, fluorescein staining, TBUT measurement, and tear meniscus height assessment. Treatment is stratified based on severity: starting with preservative-free artificial tears, lifestyle and environmental modifications, targeted eyelid warming and massage for MGD, and advancing to prescription anti-inflammatory agents (cyclosporine, lifitegrast) and punctal plugs."
    ]
  },
  {
    id: 9,
    title: "Conjunctivitis & Subconjunctival Hemorrhage: Clinical Signs & Management",
    category: "Clinical Optometry",
    readTime: "6 min read",
    date: "May 21, 2026",
    thumbnail: conjunctivitisImg,
    summary: "A clinical guide to conjunctivitis (viral, bacterial, allergic) and subconjunctival hemorrhage, detailing clinical signs, differential diagnosis, and evidence-based treatments.",
    clinicalDetails: {
      definition: "Conjunctivitis is an inflammation of the conjunctiva commonly caused by viral, bacterial, or allergic mechanisms. Subconjunctival hemorrhage is an extravasation of blood beneath the conjunctiva, presenting as a circumscribed bright red patch.",
      causes: [
        "A. Viral conjunctivitis: Commonly caused by adenoviruses; spreads through contact with infected eye secretions; often associated with a cold or sore throat.",
        "B. Bacterial conjunctivitis: Caused by bacteria such as Staphylococcus aureus and Streptococcus pneumoniae; spreads through contaminated hands, towels, or secretions.",
        "C. Allergic conjunctivitis: Caused by allergens such as pollen, dust, and pet dander; not contagious.",
        "D. Other causes: Chemical exposure, foreign body, contact lens-related irritation or infection, and neonatal infections."
      ],
      symptoms: [
        "Redness of the eye.",
        "Watering (epiphora).",
        "Burning or irritation.",
        "Foreign body sensation.",
        "Itching (hallmark of allergic conjunctivitis).",
        "Discharge (watery, mucous, or mucopurulent).",
        "Eyelid swelling and crusting.",
        "Sensitivity to light in some cases."
      ],
      typesTable: [
        { type: "Viral", description: "Watery discharge, redness, often starts in one eye and spreads" },
        { type: "Bacterial", description: "Mucopurulent discharge, eyelids may stick together" },
        { type: "Allergic", description: "Intense itching, watery eyes, often both eyes" }
      ],
      clinicalSigns: [
        "Conjunctival hyperemia (diffuse injection).",
        "Chemosis (conjunctival swelling).",
        "Follicles or papillae on palpebral conjunctiva.",
        "Ocular discharge (serous, mucous, or purulent).",
        "Eyelid edema.",
        "Preauricular lymph node enlargement, especially in viral conjunctivitis."
      ],
      treatments: [
        "Viral: Cold compresses, artificial tears, hand hygiene, avoid sharing towels, and avoid touching or rubbing eyes. (Antibiotics do not treat viral conjunctivitis).",
        "Bacterial: Cleaning discharge with clean water, warm compresses, and antibiotic eye drops or ointment when clinically indicated.",
        "Allergic: Allergen avoidance when possible, cold compresses, artificial tears, and topical antihistamine/mast-cell stabilizer eye drops.",
        "Subconjunctival hemorrhage: Resolves spontaneously within 1–2 weeks, artificial tears if irritated, avoid eye rubbing, and check blood pressure."
      ],
      treatmentSubtypes: [
        {
          category: "A. Viral Conjunctivitis",
          description: "Most uncomplicated viral conjunctivitis cases resolve without specific antiviral treatment.",
          items: [
            "Cold compresses to relieve burning and swelling.",
            "Artificial tears for ocular surface lubrication.",
            "Rigorous hand hygiene before and after touching the face.",
            "Avoid sharing towels, pillows, and personal items.",
            "Avoid touching or rubbing the eyes."
          ],
          note: "Antibiotics do not treat viral conjunctivitis."
        },
        {
          category: "B. Bacterial Conjunctivitis",
          description: "Mild cases may resolve without antibiotics, but topical therapy expedites recovery.",
          items: [
            "Cleaning discharge with clean sterile water.",
            "Warm compresses to loosen lid crusting.",
            "Antibiotic eye drops or ointment when clinically indicated.",
            "Antibiotic selection based on clinical assessment, particularly for contact lens wearers or severe cases."
          ]
        },
        {
          category: "C. Allergic Conjunctivitis",
          description: "Focused on allergen elimination and mast cell / histamine stabilization.",
          items: [
            "Avoid the allergen when possible.",
            "Cold compresses to alleviate itching and chemosis.",
            "Artificial tears to dilute allergen concentration.",
            "Topical antihistamine/mast-cell stabilizer eye drops."
          ]
        }
      ],
      secondaryCondition: {
        title: "Subconjunctival Hemorrhage",
        definition: "A bright red patch on the sclera caused by rupture of tiny conjunctival blood vessels beneath the clear ocular surface.",
        causes: [
          "Eye rubbing or minor trauma.",
          "Coughing, sneezing, or straining.",
          "High blood pressure (systemic hypertension).",
          "Diabetes mellitus.",
          "Blood-thinning medicines (anticoagulants / antiplatelets).",
          "Sometimes no identifiable cause (idiopathic)."
        ],
        symptoms: [
          "Usually painless.",
          "Bright red patch on the sclera.",
          "Vision is usually normal.",
          "No ocular discharge.",
          "Mild irritation may occur."
        ],
        treatments: [
          "Usually resolves spontaneously within 1–2 weeks.",
          "Artificial tears if there is irritation.",
          "Avoid rubbing the eye.",
          "Check blood pressure if appropriate.",
          "Review recurrent episodes with a clinician."
        ],
        note: "Normal visual acuity and absence of pain differentiate subconjunctival hemorrhage from intraocular trauma or acute angle closure."
      }
    },
    content: [
      "Conjunctivitis is an inflammation of the conjunctiva, the transparent membrane that covers the sclera and lines the inside of the eyelids. Etiologies are divided into viral (frequently adenoviral, associated with upper respiratory symptoms and preauricular lymphadenopathy), bacterial (marked by mucopurulent discharge and matting of eyelids), and allergic (distinguished by intense itching and bilateral chemosis).",
      "Because antibiotics are ineffective against viral pathogens, accurate differential diagnosis is critical to avoid antibiotic resistance. Management of viral conjunctivitis focuses on strict infection control, hand hygiene, and cold compresses. Bacterial infections benefit from warm compresses and targeted antibiotic drops, while allergic cases are managed with cold compresses, allergen mitigation, and dual-action antihistamine/mast-cell stabilizer drops.",
      "Subconjunctival hemorrhage presents as an alarming, discrete pool of blood on the sclera following minor trauma, coughing, straining, or elevated blood pressure. Because it is painless, does not impair visual acuity, and presents without discharge, clinical care centers on reassurance, supportive artificial tears, blood pressure assessment, and monitoring spontaneous absorption over 1 to 2 weeks."
    ]
  },
  {
    id: 10,
    title: "Eye Allergies (Allergic Eye Disease): Causes, Types & Management",
    category: "Clinical Optometry",
    readTime: "5 min read",
    date: "May 10, 2026",
    thumbnail: eyeAllergyImg,
    summary: "A clinical guide to ocular allergies, detailing environmental allergens, risk factors, hallmark symptoms, clinical signs, classification (SAC, PAC, VKC, AKC, GPC), and stepped medical therapy.",
    clinicalDetails: {
      definition: "Eye allergies occur when the immune system reacts to allergens, producing mast cell degranulation, histamine release, and ocular surface inflammation.",
      causes: [
        "Dust and dust mites.",
        "Pollen (trees, grass, weeds).",
        "Pet dander.",
        "Mold spores.",
        "Smoke and other environmental irritants."
      ],
      riskFactors: [
        "History of allergy or asthma.",
        "Atopic dermatitis.",
        "Seasonal exposure to pollen.",
        "Contact lens wear, particularly with associated giant papillary conjunctivitis."
      ],
      symptoms: [
        "Itching (the hallmark characteristic symptom).",
        "Redness (conjunctival injection).",
        "Watery eyes (epiphora).",
        "Burning sensation.",
        "Swollen eyelids (eyelid edema).",
        "Foreign body sensation.",
        "Stringy or ropy discharge.",
        "Light sensitivity in some cases."
      ],
      clinicalSigns: [
        "Conjunctival hyperemia.",
        "Chemosis (conjunctival edema).",
        "Papillae on the tarsal conjunctiva.",
        "Eyelid edema.",
        "Watery discharge.",
        "Possible corneal involvement in severe allergic disease."
      ],
      typesTable: [
        { type: "Seasonal allergic conjunctivitis", description: "Occurs during particular pollen seasons" },
        { type: "Perennial allergic conjunctivitis", description: "Symptoms occur throughout the year" },
        { type: "Vernal keratoconjunctivitis (VKC)", description: "Chronic, often severe allergy in children and young adults" },
        { type: "Atopic keratoconjunctivitis (AKC)", description: "Associated with atopic dermatitis" },
        { type: "Giant papillary conjunctivitis (GPC)", description: "Often associated with contact lenses or ocular prostheses" }
      ],
      treatments: [
        "A. Avoid allergens: Reduce dust/pollen exposure, keep windows closed, wash hands/face, avoid eye rubbing, and reduce dust mites.",
        "B. Cold compress: Clean, cold compress over closed eyes for 5–10 minutes to reduce itching and swelling.",
        "C. Artificial tears: Lubricating drops to dilute allergens and relieve irritation (preservative-free for frequent use).",
        "D. Antiallergic eye drops: Common medications include Ketotifen, Olopatadine, Epinastine, and Azelastine.",
        "E. Severe cases: Topical corticosteroids for short periods when indicated, or immunomodulators (cyclosporine/tacrolimus) prescribed by an ophthalmologist."
      ],
      treatmentSubtypes: [
        {
          category: "A. Avoid Allergens",
          description: "Primary non-pharmacological management to prevent allergen exposure and mast cell triggering.",
          items: [
            "Reduce exposure to dust and pollen.",
            "Keep windows closed during high-pollen periods.",
            "Wash hands and face after outdoor exposure.",
            "Avoid rubbing the eyes (rubbing causes mechanical mast cell degranulation).",
            "Use clean bedding and reduce dust mites."
          ]
        },
        {
          category: "B. Cold Compress",
          description: "Thermal vasoconstriction to quickly calm burning and eyelid swelling.",
          items: [
            "Apply a clean, cold compress over closed eyes for 5–10 minutes to reduce itching and swelling."
          ]
        },
        {
          category: "C. Artificial Tears",
          description: "Physical dilution of allergens and inflammatory cytokines across the tear film.",
          items: [
            "Lubricating eye drops help dilute allergens and relieve irritation.",
            "Preservative-free drops are useful for frequent application."
          ]
        },
        {
          category: "D. Antiallergic Eye Drops",
          description: "Direct receptor antagonism and mast cell stabilization.",
          items: [
            "Ketotifen",
            "Olopatadine",
            "Epinastine",
            "Azelastine"
          ],
          note: "These reduce allergic symptoms by blocking histamine and/or stabilizing mast cells."
        },
        {
          category: "E. Severe Cases (Ophthalmologist Prescribed)",
          description: "Advanced anti-inflammatory regimens for vision-threatening or refractory inflammation.",
          items: [
            "Topical corticosteroids for short periods when indicated.",
            "Other anti-inflammatory treatment, such as cyclosporine or tacrolimus, for selected chronic cases."
          ],
          note: "Steroids must be used strictly under clinical supervision with IOP monitoring."
        }
      ]
    },
    content: [
      "Eye allergies (allergic eye disease) arise when the ocular surface immune apparatus mounts an exaggerated IgE-mediated response to ubiquitous environmental antigens. Upon contact with allergen particles, sensitized mast cells in the conjunctiva degranulate, releasing histamine and lipid mediators that cause marked vasodilation, intense itching, chemosis, and epiphora.",
      "The clinical spectrum ranges from mild seasonal or perennial allergic conjunctivitis to more debilitating conditions such as vernal keratoconjunctivitis (VKC), atopic keratoconjunctivitis (AKC), and contact lens-associated giant papillary conjunctivitis (GPC). Recognition of tarsal papillae and potential corneal involvement is essential to prevent permanent scarring.",
      "Effective clinical management combines environmental allergen mitigation, chilled non-preserved ocular lubricants, and dual-acting topical mast-cell stabilizers and antihistamines. Refractory cases warrant careful ophthalmologic oversight with pulsed topical corticosteroids or immunomodulatory agents."
    ]
  },
  {
    id: 11,
    title: "Eye Injury: Causes, Symptoms, Types, First Aid & Treatment",
    subtitle: "Clinical Trauma Protocols & Emergency Ophthalmic Management",
    category: "Emergency Care",
    readTime: "6 min read",
    date: "May 18, 2026",
    thumbnail: eyeInjuryImg,
    summary: "Clinical guidelines on ocular trauma, covering common causes, hallmark symptoms, injury classification (abrasions, chemical burns, blunt impact, penetrating wounds), emergency first aid, and stepped medical treatments.",
    clinicalDetails: {
      definition: "An eye injury encompasses any physical, mechanical, or chemical insult to the ocular tissues or periorbital structures, ranging from minor superficial abrasions to vision-threatening globe perforations.",
      causes: [
        "Dust or foreign body entering the eye.",
        "Scratches from fingernails or other objects.",
        "Chemical exposure (acids or alkalis).",
        "Blunt trauma from sports or accidents.",
        "Sharp objects penetrating the eye.",
        "Welding or ultraviolet radiation.",
        "Contact lens-related injury."
      ],
      symptoms: [
        "Eye pain.",
        "Redness.",
        "Watering (reflex epiphora).",
        "Foreign body sensation.",
        "Blurred or reduced vision.",
        "Photophobia.",
        "Swelling or bruising (ecchymosis).",
        "Bleeding (hyphema or subconjunctival).",
        "Double vision (diplopia)."
      ],
      emergencyAlert: "Penetrating eye injuries and chemical exposures are critical ophthalmic emergencies. Never apply pressure to the eyeball, do not attempt to remove embedded objects, and initiate immediate, continuous chemical irrigation without delay.",
      typesTable: [
        { type: "Corneal abrasion", description: "A scratch on the corneal epithelium. Signs: Pain, watering, photophobia, and fluorescein staining. Treatment: Remove superficial foreign body if safe, lubricants, and antibiotic prophylaxis." },
        { type: "Foreign body", description: "A particle such as dust, metal, or sand enters the eye. Treatment: Careful examination, safe removal if superficial, and immediate referral if embedded or penetrating." },
        { type: "Chemical injury", description: "Caused by acids or alkalis. Symptoms: Severe burning, redness, watering, and blurred vision. Treatment: Priority immediate irrigation for 20-30+ minutes; do not delay to identify the chemical." },
        { type: "Blunt trauma", description: "Caused by a ball, fist, or other object. Possible complications: Hyphema, lens dislocation, retinal injury, orbital fracture." },
        { type: "Penetrating injury", description: "A sharp object penetrates the eye. This is an absolute emergency and threatens permanent vision loss." }
      ],
      firstAid: [
        {
          situation: "For Dust or a Superficial Foreign Body",
          steps: [
            "Do not rub the eye under any circumstances.",
            "Wash hands thoroughly with soap and clean water.",
            "Rinse the eye with clean running water or sterile saline solution.",
            "If the particle does not wash out, seek prompt medical care."
          ],
          warning: "Never use cotton swabs, needles, or tweezers directly on the cornea."
        },
        {
          situation: "For Chemical Injury (Acids or Alkalis)",
          steps: [
            "Start irrigation immediately — every second counts.",
            "Use clean running tap water or sterile saline.",
            "Irrigate continuously for at least 20–30 minutes, or longer if irritation persists.",
            "Remove contact lenses immediately if easy and safe to do so.",
            "Seek emergency ophthalmic hospital care right away."
          ],
          warning: "Do not waste time trying to identify the exact chemical before initiating copious flush.",
          emergency: true
        },
        {
          situation: "For Penetrating Injury",
          steps: [
            "Do not press on the eye under any circumstance.",
            "Do not attempt to extract or remove an embedded object.",
            "Place a rigid eye shield (or clean paper cup bottom) over the eye without applying pressure.",
            "Proceed to an emergency department or specialized eye hospital immediately."
          ],
          warning: "Zero pressure on the eye globe to prevent expulsion of intraocular contents.",
          emergency: true
        }
      ],
      injuryTreatmentTable: [
        { injury: "Corneal abrasion", treatment: "Lubricants and appropriate medication (prophylactic antibiotic drops, therapeutic bandage contact lens when indicated)" },
        { injury: "Superficial foreign body", treatment: "Safe removal and examination under slit-lamp magnification with lid eversion" },
        { injury: "Chemical injury", treatment: "Immediate continuous irrigation, pH monitoring, and emergency ophthalmic care" },
        { injury: "Blunt trauma", treatment: "Comprehensive ophthalmic assessment and clinical treatment of complications (hyphema, retinal tears, orbital blowout fracture)" },
        { injury: "Penetrating injury", treatment: "Emergency surgical evaluation, rigid eye shield, nil by mouth, and immediate operative repair" }
      ],
      treatments: [
        "Corneal abrasion: Lubricants and appropriate medication with topical antibiotic prophylaxis.",
        "Superficial foreign body: Safe removal under slit-lamp visualization and careful structural examination.",
        "Chemical injury: Immediate continuous irrigation for 20–30 minutes followed by emergency ophthalmic care.",
        "Blunt trauma: Ophthalmic assessment and management of internal complications (hyphema, lens dislocation, retinal injury, orbital fracture).",
        "Penetrating injury: Urgent surgical evaluation under rigid non-compressive shielding."
      ]
    },
    content: [
      "Eye injuries encompass a wide spectrum of ocular trauma ranging from common corneal epithelial abrasions to vision-threatening penetrations and caustic chemical exposures. Rapid clinical assessment, accurate mechanism identification, and prompt triage dictate visual prognosis.",
      "In chemical injuries, immediate and sustained ocular surface irrigation takes precedence over formal vision testing or chemical identification. In penetrating trauma, strict avoidance of globe compression and placement of a rigid protective shield prevent extrusion of delicate intraocular structures.",
      "Definitive clinical management leverages slit-lamp biomicroscopy, fluorescein staining, intraocular pressure measurement, and dilated indirect ophthalmoscopy to detect hidden complications such as hyphema, traumatic cataract, or peripheral retinal breaks."
    ]
  },
  {
    id: 12,
    title: "Blepharitis: Causes, Symptoms, Types, Lid Hygiene & Medical Care",
    subtitle: "Anterior, Posterior (MGD) & Mixed Eyelid Margin Inflammation",
    category: "Ocular Surface Care",
    readTime: "5 min read",
    date: "May 22, 2026",
    thumbnail: blepharitisImg,
    summary: "A clinical guide to blepharitis, covering bacterial colonization, meibomian gland dysfunction, anterior vs. posterior signs, structured 4-step lid hygiene routines, and stepped pharmaceutical therapies.",
    clinicalDetails: {
      definition: "Blepharitis is a chronic, often recurrent inflammatory condition of the eyelid margins, affecting the lash follicles (anterior blepharitis) and/or meibomian gland orifices (posterior blepharitis).",
      causes: [
        "Bacterial overgrowth, especially Staphylococcus species.",
        "Meibomian gland dysfunction (MGD).",
        "Seborrheic dermatitis.",
        "Rosacea (ocular rosacea).",
        "Demodex mite infestation.",
        "Allergic or irritant reactions."
      ],
      symptoms: [
        "Itching and burning.",
        "Redness of eyelid margins.",
        "Crusting around eyelashes.",
        "Foreign body sensation.",
        "Watery or dry eyes.",
        "Eyelid swelling.",
        "Fluctuating vision."
      ],
      typesTable: [
        { type: "Anterior blepharitis", description: "Affects the eyelid margin near the eyelashes; commonly driven by Staphylococcal or seborrheic colonization" },
        { type: "Posterior blepharitis", description: "Involves the meibomian glands; characterized by gland obstruction, altered lipid secretion, and evaporative dry eye" },
        { type: "Mixed blepharitis", description: "Both anterior eyelash base and posterior meibomian gland involvement coexist simultaneously" }
      ],
      clinicalSignsSubsections: [
        {
          title: "Anterior Blepharitis Signs",
          signs: [
            "Scales or crusts around eyelashes.",
            "Red eyelid margins (marginal hyperemia).",
            "Collarettes (cylindrical dandruff rings along lash bases).",
            "Possible lash loss (madarosis), poliosis, or trichiasis in chronic disease."
          ]
        },
        {
          title: "Posterior Blepharitis Signs",
          signs: [
            "Meibomian gland dysfunction (MGD).",
            "Thickened, turbid meibum on expression.",
            "Capped gland openings with marginal telangiectasia.",
            "Frothy tears visible in the tear meniscus.",
            "Tear film instability with reduced Tear Break-Up Time (TBUT)."
          ]
        }
      ],
      treatmentSubtypes: [
        {
          category: "A. Lid Hygiene (The Most Important Long-Term Treatment)",
          description: "Meticulous daily eyelid hygiene is the cornerstone of long-term therapy and prevents recurring acute flare-ups.",
          items: [
            "1. Apply a warm compress for 5–10 minutes to melt thickened meibomian secretions and soften lash debris.",
            "2. Gently massage the eyelids toward the lash margins (downward for the upper lid, upward for the lower lid).",
            "3. Clean the eyelid margins with a suitable lid cleanser, hypochlorous acid solution, or diluted baby shampoo foam.",
            "4. Repeat regularly as part of a daily eyelid health regimen."
          ]
        },
        {
          category: "B. Artificial Tears",
          description: "Topical tear replacement to soothe ocular irritation and reinforce tear film stability.",
          items: [
            "Lubricating eye drops help relieve associated dry eye symptoms.",
            "Lipid-based or preservative-free formulations are optimal for frequent daily application."
          ]
        },
        {
          category: "C. Medications (Ophthalmologist Prescribed)",
          description: "Stepped medical therapies indicated for persistent bacterial infection, severe MGD, or Demodex infestation.",
          items: [
            "Topical antibiotics for selected anterior blepharitis cases (e.g., erythromycin, bacitracin, or azithromycin ophthalmic solution).",
            "Oral doxycycline or azithromycin for selected patients with significant MGD or ocular rosacea (anti-inflammatory meibum-regulating doses).",
            "Anti-inflammatory treatment (short courses of topical mild corticosteroids or topical cyclosporine) in appropriate cases under clinical supervision.",
            "Anti-Demodex treatment (terpinen-4-ol / tea tree oil formulations or lotilaner ophthalmic drops) when indicated."
          ],
          note: "Prescription medications must be tailored and monitored by an eye care specialist to prevent side effects."
        }
      ],
      treatments: [
        "A. Lid hygiene: Warm compress (5–10 min), gentle eyelid massage, and cleaning with a suitable lid cleanser.",
        "B. Artificial tears: Lubricating eye drops to relieve dry eye and tear film instability.",
        "C. Medications: Topical antibiotics for anterior cases, oral doxycycline/azithromycin for MGD/rosacea, and anti-inflammatory or anti-Demodex therapy when indicated."
      ]
    },
    content: [
      "Blepharitis is a ubiquitous ocular surface disorder characterized by chronic eyelid margin inflammation. It represents a significant clinical challenge due to its recurrent nature and strong association with evaporative dry eye disease, seborrheic dermatitis, and ocular rosacea.",
      "Anterior blepharitis focuses on the cilia roots, presenting with collarettes, crusting, and micro-ulcerations, whereas posterior blepharitis manifests as meibomian gland obstruction, turbid meibum expression, and tear film hyperosmolarity.",
      "Patient education regarding disciplined, daily 4-step lid hygiene remains the foundation of therapy. In moderate-to-severe disease, targeted ophthalmic pharmacotherapy—including topical macrolides, low-dose oral tetracyclines, and anti-Demodex formulations—restores ocular surface equilibrium."
    ]
  }
];

// Apple-style cubic-bezier easing for smooth cinematic reveals
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

interface BlogSectionProps {
  onSelectArticle?: (article: Article) => void;
  highlightedArticleId?: number | null;
}

export default function BlogSection({ onSelectArticle, highlightedArticleId }: BlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section
      id="blog"
      className="relative bg-zinc-950 py-12 md:py-16 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(10,100,255,0.01)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full z-10 space-y-8">
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-black text-white uppercase leading-[0.95] tracking-tight">
            EYE CARE <br />
            <span className="text-zinc-500 italic font-black">CHRONICLES</span>
          </h2>
        </div>

        {/* 3-Column Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full py-3">
          {ARTICLES_DATA.map((article) => (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              className={`bg-zinc-900/40 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group transition-all duration-[350ms] ease-out [@media(hover:hover)]:hover:-translate-y-2.5 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:border-blue-500/60 [@media(hover:hover)]:hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)] will-change-transform ${
                highlightedArticleId === article.id
                  ? "border-2 border-brand-blue shadow-2xl shadow-brand-blue/30 ring-4 ring-brand-blue/30"
                  : "border border-white/10"
              }`}
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-[16/10] w-full bg-zinc-950/20 overflow-hidden relative border-b border-white/10">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800";
                    }}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-[350ms] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-950/60 backdrop-blur-md text-zinc-100 font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                    {article.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white uppercase tracking-tight leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-350 leading-relaxed font-light">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read button CTA */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(article);
                    } else {
                      setSelectedArticle(article);
                    }
                  }}
                  className="flex items-center gap-1 font-mono text-[10px] text-brand-blue group-hover:text-white font-bold tracking-widest uppercase cursor-pointer"
                >
                  <span>Read Article</span>
                  <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full formatted Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-zinc-900/60 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header Image cover */}
              <div className="h-48 md:h-64 relative w-full bg-zinc-950 shrink-0">
                <img
                  src={selectedArticle.thumbnail}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent pointer-events-none" />
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-950/40 backdrop-blur-md border border-white/10 hover:border-brand-blue text-zinc-400 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h4 className="font-serif text-2xl font-black text-white uppercase tracking-tight mt-3">
                    {selectedArticle.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable Article Body Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                <div className="flex gap-4 text-zinc-400 font-mono text-[9px] uppercase tracking-widest border-b border-white/5 pb-3 font-sans">
                  <span className="flex items-center gap-1 text-zinc-400"><Clock size={11} /> {selectedArticle.readTime}</span>
                  <span className="flex items-center gap-1 text-zinc-400 ml-auto cursor-pointer hover:text-brand-blue"><Share2 size={11} /> Share</span>
                </div>

                {/* Clinical Details if defined */}
                {selectedArticle.clinicalDetails && (
                  <div className="space-y-3.5 my-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 font-sans">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                      <h5 className="font-mono text-[11px] text-brand-blue uppercase font-bold tracking-wider mb-1">
                        Definition
                      </h5>
                      <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                        {selectedArticle.clinicalDetails.definition}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Cause
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.causes.map((c, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-brand-blue">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>

                        {selectedArticle.clinicalDetails.riskFactors && selectedArticle.clinicalDetails.riskFactors.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <span className="font-mono text-[10px] text-amber-400 font-bold block mb-1">
                              Risk Factors:
                            </span>
                            <ul className="text-xs text-zinc-300 space-y-0.5">
                              {selectedArticle.clinicalDetails.riskFactors.map((rf, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-amber-400">•</span>
                                  <span>{rf}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Symptoms
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.symptoms.map((s, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-amber-400">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Treatment
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.treatments.map((t, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-emerald-400">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Emergency Alert if defined */}
                    {selectedArticle.clinicalDetails.emergencyAlert && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-200">
                        <span className="font-bold text-red-400 mr-1.5 uppercase font-mono text-[10px]">Emergency:</span>
                        {selectedArticle.clinicalDetails.emergencyAlert}
                      </div>
                    )}

                    {/* Mechanism if defined */}
                    {selectedArticle.clinicalDetails.mechanism && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-blue-500/20 text-xs text-zinc-300">
                        <span className="font-semibold text-brand-blue block mb-1">Aqueous Drainage Mechanism:</span>
                        {selectedArticle.clinicalDetails.mechanism}
                      </div>
                    )}

                    {/* Note if defined */}
                    {selectedArticle.clinicalDetails.note && (
                      <div className="p-3 rounded-lg bg-brand-blue/[0.05] border border-brand-blue/20 text-xs text-zinc-200">
                        <span className="font-semibold text-brand-blue">Clinical Progression Note: </span>
                        {selectedArticle.clinicalDetails.note}
                      </div>
                    )}

                    {/* Clinical Signs if defined */}
                    {selectedArticle.clinicalDetails.clinicalSigns && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1.5">
                          Clinical Signs
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.clinicalSigns.map((cs, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-purple-400">•</span>
                              <span>{cs}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Subtype Clinical Signs (e.g. Anterior / Posterior Blepharitis) */}
                    {selectedArticle.clinicalDetails.clinicalSignsSubsections && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-2.5">
                        <h5 className="font-mono text-[11px] text-purple-400 uppercase font-bold tracking-wider">
                          Examination Findings by Subtype
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {selectedArticle.clinicalDetails.clinicalSignsSubsections.map((sub, i) => (
                            <div key={i} className="p-2 rounded bg-white/[0.02] border border-white/5 space-y-1">
                              <span className="font-mono text-[10px] text-brand-blue font-bold block uppercase">{sub.title}</span>
                              <ul className="text-zinc-300 space-y-0.5 text-[11px]">
                                {sub.signs.map((sign, sIdx) => (
                                  <li key={sIdx} className="flex items-start gap-1">
                                    <span className="text-purple-400">•</span>
                                    <span>{sign}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Important Investigations if defined */}
                    {selectedArticle.clinicalDetails.investigations && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-cyan-500/20">
                        <h5 className="font-mono text-[11px] text-cyan-400 uppercase font-bold tracking-wider mb-1.5">
                          Important Investigations
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.investigations.map((inv, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-cyan-400">•</span>
                              <span>{inv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Disease Stages if defined */}
                    {selectedArticle.clinicalDetails.stages && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-2">
                        <h5 className="font-mono text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1.5">
                          Types & Stages of Diabetic Retinopathy
                        </h5>
                        <div className="space-y-2">
                          {selectedArticle.clinicalDetails.stages.map((stg, i) => (
                            <div key={i} className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-bold text-white">{stg.stage}</span>
                                {stg.category && <span className="text-[10px] text-zinc-400 font-mono">{stg.category}</span>}
                              </div>
                              {stg.description && <p className="text-zinc-300 text-xs mb-1 font-light">{stg.description}</p>}
                              {stg.features && (
                                <ul className="text-xs text-zinc-300 space-y-0.5">
                                  {stg.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-1">
                                      <span className="text-purple-400">•</span>
                                      <span>{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {stg.complications && (
                                <div className="mt-1 pt-1 border-t border-white/5">
                                  <span className="text-[10px] font-mono text-red-400 font-bold block mb-0.5">Complications:</span>
                                  <ul className="text-xs text-red-200/90 space-y-0.5">
                                    {stg.complications.map((comp, ci) => (
                                      <li key={ci} className="flex items-start gap-1">
                                        <span className="text-red-400">•</span>
                                        <span>{comp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Signs Table if defined */}
                    {selectedArticle.clinicalDetails.clinicalSignsTable && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <h5 className="font-mono text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1.5">
                          Clinical Signs & Meaning
                        </h5>
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-zinc-400 border-b border-white/10 font-mono text-[10px]">
                              <th className="py-1.5 pr-2">Sign</th>
                              <th className="py-1.5">Meaning</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {selectedArticle.clinicalDetails.clinicalSignsTable.map((row, i) => (
                              <tr key={i}>
                                <td className="py-1.5 pr-2 font-medium text-white whitespace-nowrap">{row.sign}</td>
                                <td className="py-1.5 text-zinc-300">{row.meaning}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Diagnostic Investigations Table if defined */}
                    {selectedArticle.clinicalDetails.investigationsTable && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-cyan-500/20 overflow-x-auto">
                        <h5 className="font-mono text-[11px] text-cyan-400 uppercase font-bold tracking-wider mb-1.5">
                          Diagnostic Investigations
                        </h5>
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-zinc-400 border-b border-white/10 font-mono text-[10px]">
                              <th className="py-1.5 pr-2 text-cyan-400">Test</th>
                              <th className="py-1.5">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {selectedArticle.clinicalDetails.investigationsTable.map((row, i) => (
                              <tr key={i}>
                                <td className="py-1.5 pr-2 font-medium text-white whitespace-nowrap">{row.test}</td>
                                <td className="py-1.5 text-zinc-300">{row.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Types Table if defined */}
                    {selectedArticle.clinicalDetails.typesTable && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <h5 className="font-mono text-[11px] text-brand-blue uppercase font-bold tracking-wider mb-1.5">
                          Types & Classification
                        </h5>
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-zinc-400 border-b border-white/10 font-mono text-[10px]">
                              <th className="py-1.5 pr-2">Type</th>
                              <th className="py-1.5">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {selectedArticle.clinicalDetails.typesTable.map((row, i) => (
                              <tr key={i}>
                                <td className="py-1.5 pr-2 font-medium text-white whitespace-nowrap">{row.type}</td>
                                <td className="py-1.5 text-zinc-300">{row.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Medications Table if defined */}
                    {selectedArticle.clinicalDetails.medicationsTable && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <h5 className="font-mono text-[11px] text-emerald-400 uppercase font-bold tracking-wider mb-1.5">
                          Eye Drops (Medications)
                        </h5>
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-zinc-400 border-b border-white/10 font-mono text-[10px]">
                              <th className="py-1.5 pr-2">Medication</th>
                              <th className="py-1.5">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {selectedArticle.clinicalDetails.medicationsTable.map((row, i) => (
                              <tr key={i}>
                                <td className="py-1.5 pr-2 font-medium text-white whitespace-nowrap">{row.medication}</td>
                                <td className="py-1.5 text-zinc-300">{row.action}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Systemic Management if defined */}
                    {selectedArticle.clinicalDetails.systemicManagement && (
                      <div className="p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 text-xs">
                        <span className="font-mono text-[11px] text-emerald-400 uppercase font-bold tracking-wider block mb-1.5">
                          Systemic Management
                        </span>
                        <ul className="text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.systemicManagement.map((sm, i) => (
                            <li key={i} className={`flex items-start gap-1 ${sm.includes("Important") ? "text-amber-300 font-medium" : ""}`}>
                              <span className={sm.includes("Important") ? "text-amber-400" : "text-emerald-400"}>•</span>
                              <span>{sm}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Injections if defined */}
                    {selectedArticle.clinicalDetails.injections && (
                      <div className="p-3 rounded-lg bg-cyan-500/[0.04] border border-cyan-500/25 text-xs space-y-1.5">
                        <span className="font-mono text-[11px] text-cyan-400 uppercase font-bold tracking-wider block">
                          {selectedArticle.clinicalDetails.injections.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {selectedArticle.clinicalDetails.injections.medications.map((med, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
                              {med}
                            </span>
                          ))}
                        </div>
                        <p className="text-zinc-300 text-xs font-light">
                          <span className="text-white font-medium">Action: </span>
                          {selectedArticle.clinicalDetails.injections.action}
                        </p>
                      </div>
                    )}

                    {/* Laser and Surgery if defined */}
                    {selectedArticle.clinicalDetails.laserTreatments && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-brand-blue/20">
                        <h5 className="font-mono text-[11px] text-brand-blue uppercase font-bold tracking-wider mb-1.5">
                          Laser Treatment
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.laserTreatments.map((lt, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-brand-blue">•</span>
                              <span>{lt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedArticle.clinicalDetails.surgicalTreatments && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-purple-500/20">
                        <h5 className="font-mono text-[11px] text-purple-400 uppercase font-bold tracking-wider mb-1.5">
                          Surgical Options
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.surgicalTreatments.map((st, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-purple-400">•</span>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Early stage and Advanced treatment if defined */}
                    {selectedArticle.clinicalDetails.earlyStageTreatment && (
                      <div className="p-3 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/20 text-xs">
                        <span className="font-semibold text-emerald-400 block mb-1">
                          {selectedArticle.title.toLowerCase().includes("dry eye") ? "Artificial Tears (First-Line Lubrication):" : "Early Stage (Mild Cataract):"}
                        </span>
                        <ul className="text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.earlyStageTreatment.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-emerald-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Lifestyle and environmental modifications */}
                    {selectedArticle.clinicalDetails.lifestyleChanges && (
                      <div className="p-3 rounded-lg bg-cyan-500/[0.05] border border-cyan-500/20 text-xs">
                        <span className="font-semibold text-cyan-400 block mb-1">Lifestyle & Environmental Modifications:</span>
                        <ul className="text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.lifestyleChanges.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-cyan-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Meibomian gland dysfunction protocol */}
                    {selectedArticle.clinicalDetails.mgdTreatment && (
                      <div className="p-3 rounded-lg bg-amber-500/[0.05] border border-amber-500/20 text-xs">
                        <span className="font-semibold text-amber-400 block mb-1">Meibomian Gland Dysfunction (MGD) Care:</span>
                        <ul className="text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.mgdTreatment.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-amber-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prescription treatment */}
                    {selectedArticle.clinicalDetails.prescriptionTreatment && (
                      <div className="p-3 rounded-lg bg-purple-500/[0.05] border border-purple-500/20 text-xs">
                        <span className="font-semibold text-purple-400 block mb-1">Prescription Treatment & Plugs:</span>
                        <ul className="text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.prescriptionTreatment.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-purple-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedArticle.clinicalDetails.treatmentWarning && (
                      <div className="p-3 rounded-lg bg-amber-500/[0.08] border border-amber-500/30 text-xs text-amber-200">
                        <span className="font-bold text-amber-400 mr-1.5">Important:</span>
                        {selectedArticle.clinicalDetails.treatmentWarning}
                      </div>
                    )}

                    {selectedArticle.clinicalDetails.advancedTreatment && (
                      <div className="p-3 rounded-lg bg-blue-500/[0.05] border border-brand-blue/20 text-xs text-zinc-200">
                        <span className="font-semibold text-brand-blue block mb-0.5">Advanced Treatment:</span>
                        <span className="text-white font-medium">{selectedArticle.clinicalDetails.advancedTreatment}</span>
                      </div>
                    )}

                    {/* Subtype-specific treatments (Viral, Bacterial, Allergic) */}
                    {selectedArticle.clinicalDetails.treatmentSubtypes && (
                      <div className="space-y-3 pt-1">
                        <span className="font-semibold text-brand-blue block text-xs">Etiology-Specific Treatment Protocols:</span>
                        {selectedArticle.clinicalDetails.treatmentSubtypes.map((sub, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 text-xs space-y-1.5">
                            <span className="font-bold text-white block">{sub.category}</span>
                            {sub.description && <p className="text-zinc-400 text-[11px] leading-relaxed">{sub.description}</p>}
                            <ul className="text-zinc-300 space-y-1">
                              {sub.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-brand-blue">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            {sub.note && (
                              <p className="text-[11px] text-amber-300 pt-1 font-medium">
                                <strong>Note:</strong> {sub.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* First Aid Protocols for Eye Injuries */}
                    {selectedArticle.clinicalDetails.firstAid && (
                      <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 text-xs space-y-3">
                        <span className="font-mono text-xs text-amber-300 uppercase font-bold tracking-wider block">
                          Emergency First Aid Protocols
                        </span>
                        <div className="space-y-2.5">
                          {selectedArticle.clinicalDetails.firstAid.map((fa, i) => (
                            <div 
                              key={i} 
                              className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                                fa.emergency ? "bg-red-500/[0.08] border-red-500/30" : "bg-black/30 border-white/5"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-white text-[11px]">{fa.situation}</span>
                                {fa.emergency && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                                    Urgent
                                  </span>
                                )}
                              </div>
                              <ul className="text-zinc-300 space-y-0.5 text-[11px]">
                                {fa.steps.map((st, sIdx) => (
                                  <li key={sIdx}>• {st}</li>
                                ))}
                              </ul>
                              {fa.warning && (
                                <p className="text-[10px] text-red-300 pt-0.5 font-medium">
                                  <strong>Warning:</strong> {fa.warning}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Injury Treatment Table */}
                    {selectedArticle.clinicalDetails.injuryTreatmentTable && (
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                        <span className="font-mono text-[11px] text-emerald-400 uppercase font-bold tracking-wider block">
                          Treatment by Injury Classification
                        </span>
                        <div className="space-y-1.5">
                          {selectedArticle.clinicalDetails.injuryTreatmentTable.map((item, idx) => (
                            <div key={idx} className="p-2 rounded bg-white/[0.02] border border-white/5 text-[11px] flex flex-col gap-0.5">
                              <span className="font-bold text-white">{item.injury}</span>
                              <span className="text-zinc-300 font-light">{item.treatment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Secondary Condition: Subconjunctival Hemorrhage */}
                    {selectedArticle.clinicalDetails.secondaryCondition && (
                      <div className="p-3.5 rounded-xl bg-red-500/[0.05] border border-red-500/20 text-xs space-y-2">
                        <span className="font-bold text-red-400 block text-[13px]">
                          {selectedArticle.clinicalDetails.secondaryCondition.title}
                        </span>
                        {selectedArticle.clinicalDetails.secondaryCondition.definition && (
                          <p className="text-zinc-300 text-[11px]">
                            {selectedArticle.clinicalDetails.secondaryCondition.definition}
                          </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="p-2 rounded bg-black/30 border border-white/5">
                            <span className="text-amber-300 font-semibold block mb-0.5">Symptoms:</span>
                            <ul className="text-zinc-300 space-y-0.5">
                              {selectedArticle.clinicalDetails.secondaryCondition.symptoms.map((s, idx) => (
                                <li key={idx}>• {s}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-2 rounded bg-black/30 border border-white/5">
                            <span className="text-emerald-300 font-semibold block mb-0.5">Management:</span>
                            <ul className="text-zinc-300 space-y-0.5">
                              {selectedArticle.clinicalDetails.secondaryCondition.treatments.map((t, idx) => (
                                <li key={idx}>• {t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {selectedArticle.clinicalDetails.secondaryCondition.note && (
                          <p className="text-[11px] text-red-200 bg-red-500/10 p-2 rounded border border-red-500/20">
                            <strong>Note:</strong> {selectedArticle.clinicalDetails.secondaryCondition.note}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Example if defined */}
                    {selectedArticle.clinicalDetails.example && (
                      <div className="p-3 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-zinc-200">
                        <span className="font-semibold text-emerald-400">Prescription Example: </span>
                        <span className="font-mono text-emerald-300">{selectedArticle.clinicalDetails.example}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4 font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index} className="first-letter:text-lg first-letter:font-serif first-letter:text-brand-blue">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-brand-blue/[0.03] backdrop-blur-sm border border-brand-blue/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h5 className="font-display text-[10px] text-brand-blue tracking-widest uppercase font-extrabold">Need custom lens solutions?</h5>
                    <p className="font-sans text-[11px] text-zinc-400 font-light mt-0.5">Book a complimentary ocular fitting diagnostic with our senior optometrist today.</p>
                  </div>
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="p-6 border-t border-white/5 bg-zinc-950/40 backdrop-blur-sm shrink-0 flex justify-between items-center">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">VIJAYA OPTICAL HOUSE RESEARCH DEPOT</span>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    const el = document.getElementById("solutions");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-lg bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer animate-pulse"
                >
                  Explore Ocular Solutions →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
