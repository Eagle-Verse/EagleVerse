import React, { useState, useEffect, useRef, type JSX } from 'react';
import Confetti from 'react-confetti';
import { Send, CheckCircle, TrendingUp, Users, Zap, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';


const PartnerForm = () => {
  const [formData, setFormData] = useState({
    // Salon Information
    salonName: '',
    BranchID: '',
    city: '',
    avgMonthlyFootfall: '',
    clientType: '',
    
    // Primary Contact
    contactName: '',
    email: '',
    phone: '',
    designation: '',
    
    // Business Details
    businessType: '',
    gstin: '',
    preferredStartDate: ''
  });
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const partnerSectionRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Consent validation
    if (!consentAgreed) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the Terms of Use before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Phone number validation
    const phone = formData.phone.replace(/\D/g, '');
    if (phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 10 digits.",
        variant: "destructive"
      });
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email Address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Prepare payload for backend
    const payload = {
      source: "website",
      salonName: formData.salonName,
      branchNumber: formData.BranchID,
      city: formData.city,
      avgMonthlyFootfall: Number(formData.avgMonthlyFootfall) || 0,
      clientType: formData.clientType,
      contactName: formData.contactName,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      contactDesignation: formData.designation,
      businessType: formData.businessType,
      gstin: formData.gstin
    };
    console.log(payload)
    try {
      const res = await axiosInstance.post('/leads', JSON.stringify(payload), {
             withCredentials: false
      }
      )
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (res.status >= 200 && res.status < 300) {
        // Response data is already parsed in Axios
        console.log('Response data:', res.data);
        Cookies.set('salon-lead-Id', res.data.id, { domain: '.eagleverse.tech', expires: 365 })
        setIsSubmitted(true);
        toast({
          title: "Partnership Request Submitted!",
          description: "We'll contact you within 12 hours to discuss your revenue transformation.",
        });
      } else {
        // Handle non-200 status codes
        const errorText = res.data.error.message;
        console.error('Error response:', errorText);
        toast({
          title: "Submission Failed",
          description: `Server responded with status ${res.status}. Please try again later.`,
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Network error:', err);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your request. Please try again later.",
        variant: "destructive"
      });
    }
  };


  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSubmitted]);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Upto 150% Revenue Boost Potential",
      description: "Leverage AI-driven insights to elevate your salon’s earning capacity"
    },
    {
      icon: Users,
      title: "30-Day Client Retention Goal",
      description: "Clients get automatic notifications for follow-ups, helping you build consistent return visits."
    },
    {
      icon: Zap,
      title: "Implementation whenever you say",
      description: "We’ll implement the system in 10 minutes on your preferred date, no pressure, just your timeline."
    }
  ];

  if (isSubmitted) {
    return (
      <section ref={partnerSectionRef} id="partner" className="mt-10 section-padding bg-navy-900">
        <Confetti recycle={false} />
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center glass-effect rounded-3xl p-12">
            <CheckCircle className="h-20 w-20 text-coral-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4 text-navy-50">
              Welcome to the Revolution!
            </h2>
            <p className="text-navy-300 text-lg mb-6">
              Our revenue optimization specialist will contact you within 12 hours to schedule your salon transformation.
            </p>
            <div className="text-coral-400 font-semibold text-xl mt-6">
              Get ready to unlock the magic of AI!
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={partnerSectionRef} id="partner" className="mt-10 section-padding bg-navy-900">
      <div className="container-width">
        {/* Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-navy-50">
            Ready to Transform
            <span className="gradient-text"> Your Salon?</span>
          </h2>
          <p className="text-xl text-navy-300 max-w-3xl mx-auto">
              Be among the first salons onboarding our AI system to boost revenue by up to 150%.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div className='flex flex-col gap-8'>
            <div>
              <div className="glass-effect rounded-xl py-6 px-4  hover-lift flex flex-col items-center">
                <h3 className="text-3xl font-serif font-semibold text-navy-50 mb-2 text-center">
                  Already a Partner?
                </h3>
                <p className="text-navy-300 text-md mb-4 text-center">
                  Access your salon's dashboard to view insights, manage appointments, and track revenue growth.
                </p>
                <a 
                  href="https://salon.eagleverse.tech" 
                  className="btn-primary inline-flex items-center justify-center space-x-2 mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Go to Dashboard</span>
                  <TrendingUp className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-serif font-semibold mb-8 text-navy-50">
              What You Get as Our Partner:
            </h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 glass-effect rounded-xl hover-lift"
                >
                  <div className="bg-coral-500 p-3 rounded-xl flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-50 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-navy-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-coral-500/10 rounded-2xl border border-coral-500/20">
              <div className="text-coral-400 font-semibold mb-2">Limited Time Offer:</div>
              <div className="text-navy-50 text-lg">
                First 30 partners get <span className="font-bold">1 month free</span> implementation support
              </div>
            </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-3xl font-serif font-semibold text-navy-50 mb-8 text-center">
              Begin Your Revenue Transformation Journey
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Salon Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-navy-50 mb-6 border-b border-navy-700 pb-2">
                  Salon Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Salon Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.salonName}
                      onChange={(e) => setFormData({...formData, salonName: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="Your salon's name"
                    />
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Branch ID/Number
                    </label>
                    <input
                      type="text"
                      value={formData.BranchID}
                      onChange={(e) => setFormData({...formData, BranchID: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="Enter branch ID or number (if applicable)"
                    />
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="Primary city location"
                    />
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Avg Monthly Customers *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.avgMonthlyFootfall}
                      onChange={(e) => setFormData({...formData, avgMonthlyFootfall: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="Enter average monthly Customers"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-navy-200 font-medium mb-2">
                      Client Type *
                    </label>
                    <select
                      required
                      value={formData.clientType}
                      onChange={(e) => setFormData({...formData, clientType: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                    >
                      <option value="">Select client type</option>
                      <option value="walk-in">Walk-in</option>
                      <option value="appointment">Appointment</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Primary Contact Section */}
              <div>
                <h3 className="text-xl font-semibold text-navy-50 mb-6 border-b border-navy-700 pb-2">
                  Primary Contact
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="Contact person name"
                    />
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Designation *
                    </label>
                    <select
  required
  value={formData.designation}
  onChange={(e) => setFormData({...formData, designation: e.target.value})}
  className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
>
  <option value="" disabled hidden>
    Select designation
  </option>
  <option value="owner">Owner</option>
  <option value="manager">Manager</option>
  {/* <option value="director">Senior Therapist</option>
  <option value="partner">Therapist</option>
  <option value="other">Receptionist</option> */}
</select>
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors ${formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-red-500' : ''}`}
                      placeholder="contact@salon.com"
                    />
                    {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <span className="text-red-500 text-sm mt-1 block">Please enter a valid email address.</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length > 10) return;
                        setFormData({ ...formData, phone: value });
                      }}
                      className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors ${formData.phone && formData.phone.length !== 10 ? 'border-red-500' : ''}`}
                      placeholder="9876543210"
                    />
                    {formData.phone && formData.phone.length !== 10 && (
                      <span className="text-red-500 text-sm mt-1 block">Phone number must be exactly 10 digits.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details Section */}
              <div>
                <h3 className="text-xl font-semibold text-navy-50 mb-6 border-b border-navy-700 pb-2">
                  Business Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      Business Type *
                    </label>
                    <select
                      required
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                    >
                      <option value="">Select business type</option>
                      <option value="partnership">Partnership</option>
                      <option value="independent">Independent</option>
                      <option value="franchise">Franchise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-navy-200 font-medium mb-2">
                      GSTIN
                    </label>
                    <input
                      type="text"
                      value={formData.gstin}
                      onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                      placeholder="22AAAAA0000A1Z5 (Optional)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-navy-200 font-medium mb-2">
                      Preferred Start Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => setFormData({...formData, preferredStartDate: e.target.value})}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-navy-50 focus:outline-none focus:border-coral-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Consent Section */}
              <div className="border-t border-navy-700 pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="consent"
                    checked={consentAgreed}
                    onCheckedChange={(checked) => setConsentAgreed(checked as boolean)}
                    className="mt-1 border-navy-600 data-[state=checked]:bg-coral-500 data-[state=checked]:border-coral-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="consent" className="text-navy-200 text-sm cursor-pointer">
                      I agree to the{' '}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            type="button"
                            className="text-coral-400 hover:text-coral-300 underline transition-colors"
                          >
                            Terms of Use and Consent Form
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-navy-800 border-navy-700">
                          <DialogHeader>
                            <DialogTitle className="text-navy-50 text-xl font-serif">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-coral-500" />
                                <span>Consent Form for Beta Testing</span>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="text-navy-200 text-sm leading-relaxed space-y-4">
                            <div className="text-center font-bold text-navy-50 text-lg mb-6">
                              CONSENT FORM FOR BETA TESTING OF MOBILE APPLICATION FOR SALON
                            </div>
                            
                            <p>
                              This Consent Form is executed on this ___ day of ______, 2025, by and between:
                            </p>
                            
                            <p>
                              <strong>Eagle Verse Technology Private Limited</strong>, incorporated under the Companies Act, 2013, having its registered office at [Registered Address], hereinafter referred to as the "Company",
                            </p>
                            
                            <p>
                              <strong>AND</strong>
                            </p>
                            
                            <p>
                              [Name of Salon/Entity], having its business address at [Salon Address], hereinafter referred to as the "Salon Partner."
                            </p>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">1. Purpose</h4>
                              <p>The Salon Partner hereby grants consent to Eagle Verse Technology Pvt. Ltd. to conduct beta testing of its mobile application/software at the premises of the Salon Partner ("One Party Salon" or any designated salon branch).</p>
                              <p>The purpose of the beta testing is for research, product improvement, and AI training.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">2. Roles and Responsibilities</h4>
                              <p><strong>a.</strong> The Salon Partner agrees to allow Eagle Verse Technology Pvt. Ltd. to conduct testing activities, including capturing photographs/videos and personal details of consenting customers for testing and AI training purposes.</p>
                              <p><strong>b.</strong> The Salon Partner shall inform customers that their participation is voluntary and obtain signed customer consent forms (provided by the Company) prior to testing.</p>
                              <p><strong>c.</strong> The Company shall be solely responsible for data collection, storage, and compliance with applicable data protection laws.</p>
                              <p><strong>d.</strong> The Salon Partner shall not be liable for any misuse or breach of customer data, provided it has followed the process of informing and facilitating customer consent.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">3. Data Collection, Accuracy, and Protection</h4>
                              <p><strong>a. Data Types:</strong> The Company may collect and process customer data including images, videos, and personal details.</p>
                              <p><strong>b. Accuracy of Results:</strong> The results generated by the beta application are based on AI models with an accuracy rate of 60–70% only. The Company makes no guarantee of 100% accuracy.</p>
                              <p><strong>c. Right to Access and Download:</strong> Customers will have the right to download and view their data upon request, subject to verification procedures.</p>
                              <p><strong>d. Data Retention:</strong> All customer data will be stored securely for a maximum of 1 years, unless anonymized, after which it shall be deleted.</p>
                              <p><strong>e. Data Protection:</strong> Data will be managed in accordance with the Digital Personal Data Protection Act, 2023, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">4. Disclaimer on Medical or Professional Advice</h4>
                              <p><strong>a.</strong> The User acknowledges that any recommendations, suggestions, or insights provided by the application are not medical advice, professional health treatment, or a substitute for consultation with a qualified doctor or professional.</p>
                              <p><strong>b.</strong> The output of the beta application is only a general advisory/recommendation generated by AI, and the decision to act upon it lies solely with the customer.</p>
                              <p><strong>c.</strong> The Company shall not be responsible or liable for any reliance placed on the app's suggestions or outcomes.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">5. No Compensation</h4>
                              <p>The Salon Partner acknowledges that it will not receive direct monetary compensation for hosting the beta testing. However, the Salon Partner may be acknowledged as a collaborator/partner in internal or external communications.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">6. Indemnity and Liability</h4>
                              <p><strong>a.</strong> Eagle Verse Technology Pvt. Ltd. shall indemnify and hold harmless the Salon Partner from any claims, disputes, or liabilities arising from customer participation in the beta testing.</p>
                              <p><strong>b.</strong> The Salon Partner shall not be held responsible for any breach of data, misuse of collected information, or disputes with customers regarding the beta testing.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">7. Governing Law and Jurisdiction</h4>
                              <p>This Consent Form shall be governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, India.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-navy-50 mb-2">8. Declaration</h4>
                              <p>We, the undersigned, have read and understood the terms of this Consent Form and voluntarily agree to allow Eagle Verse Technology Pvt. Ltd. to conduct beta testing at our salon premises.</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-navy-700">
                              <div>
                                <h5 className="font-bold text-navy-50 mb-2">For Salon Partner (One Party Salon)</h5>
                                <div className="space-y-1 text-xs">
                                  <p>Name of Authorized Person: ____________________</p>
                                  <p>Designation: _______________________________</p>
                                  <p>Signature & Seal: ___________________________</p>
                                  <p>Date: _____________________________________</p>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-bold text-navy-50 mb-2">For Eagle Verse Technology Pvt. Ltd.</h5>
                                <div className="space-y-1 text-xs">
                                  <p>Authorized Signatory: _____________________</p>
                                  <p>Designation: ____________________________</p>
                                  <p>Date: _________________________________</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {' '}for beta testing participation *
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!consentAgreed}
                className={`w-full flex items-center justify-center space-x-3 text-lg transition-all ${
                  consentAgreed 
                    ? 'btn-primary hover:shadow-lg' 
                    : 'bg-navy-700 text-navy-400 cursor-not-allowed border border-navy-600'
                }`}
              >
                <span>Start My Revenue Transformation</span>
                <Send className="h-5 w-5" />
              </button>

              <p className="text-navy-400 text-sm text-center">
                We'll contact you within 12 hours to discuss your custom implementation plan
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerForm;
