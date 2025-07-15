import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronLeft, ChevronRight, User, Scale, Mail, Lock,
  FileText, MapPin, DollarSign, GraduationCap, Calendar
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE;

const practiceAreas = [
  { id: 1, name: 'Corporate Law' },
  { id: 2, name: 'Criminal Law' },
  { id: 3, name: 'Family Law' },
  { id: 4, name: 'Immigration Law' },
  { id: 5, name: 'Personal Injury' },
  { id: 6, name: 'Real Estate Law' },
  { id: 7, name: 'Tax Law' },
  { id: 8, name: 'Employment Law' },
];

const InputField = ({ icon: Icon, label, type = 'text', field, placeholder, required = true, value, onChange, errors, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors[field] ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
    </div>
    {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
  </div>
);

const TextareaField = ({ icon: Icon, label, field, placeholder, required = true, rows = 4, value, onChange, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          errors[field] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    </div>
    {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
  </div>
);

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    user_type: 'client',
    license_number: '',
    bar_admission_date: '',
    practice_areas: [],
    biography: '',
    education: '',
    consultation_fee: '',
    office_address: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const togglePracticeArea = (areaId) => {
    setFormData((prev) => ({
      ...prev,
      practice_areas: prev.practice_areas.includes(areaId)
        ? prev.practice_areas.filter(id => id !== areaId)
        : [...prev.practice_areas, areaId]
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password1) newErrors.password1 = 'Password is required';
    else if (formData.password1.length < 8) newErrors.password1 = 'Minimum 8 characters';
    if (!formData.password2) newErrors.password2 = 'Confirm your password';
    else if (formData.password1 !== formData.password2) newErrors.password2 = 'Passwords do not match';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.license_number) newErrors.license_number = 'License number is required';
    if (!formData.bar_admission_date) newErrors.bar_admission_date = 'Bar admission date is required';
    if (formData.practice_areas.length === 0) newErrors.practice_areas = 'Select at least one area';
    if (!formData.biography) newErrors.biography = 'Biography is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.consultation_fee || isNaN(formData.consultation_fee) || formData.consultation_fee <= 0)
      newErrors.consultation_fee = 'Enter a valid hourly rate';
    if (!formData.office_address) newErrors.office_address = 'Office address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      if (formData.user_type === 'lawyer') setCurrentStep(2);
      else handleSubmit();
    } else if (currentStep === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_type: formData.user_type,
      };

      if (formData.user_type === 'lawyer') {
        Object.assign(payload, {
          license_number: formData.license_number,
          bar_admission_date: formData.bar_admission_date,
          practice_areas: formData.practice_areas,
          biography: formData.biography,
          education: formData.education,
          consultation_fee: parseFloat(formData.consultation_fee),
          office_address: formData.office_address,
        });
      }

      await axios.post(`${API_BASE}/dj-rest-auth/registration/`, payload);

      const loginRes = await axios.post(`${API_BASE}/dj-rest-auth/login/`, {
        email: formData.email,
        password: formData.password1,
      });

      const token = loginRes.data.key;
      localStorage.setItem("authToken", token);

      const userRes = await axios.get(`${API_BASE}/dj-rest-auth/user/`, {
        headers: { Authorization: `Token ${token}` },
      });

      // Optionally set user to context here

      navigate("/dashboard");
    } catch (error) {
      const errData = error.response?.data || {};
      const newErrors = {};
      Object.keys(errData).forEach((field) => {
        newErrors[field] = Array.isArray(errData[field]) ? errData[field][0] : errData[field];
      });
      if (errData.non_field_errors) newErrors.general = errData.non_field_errors[0];
      if (errData.detail) newErrors.general = errData.detail;

      setErrors(newErrors);
      console.error("Signup error:", errData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <>
      <InputField icon={Mail} label="Email" type="email" field="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} errors={errors} />
      <div className="grid grid-cols-2 gap-4">
        <InputField icon={User} label="First Name" field="first_name" placeholder="First name" value={formData.first_name} onChange={(e) => updateFormData('first_name', e.target.value)} errors={errors} />
        <InputField icon={User} label="Last Name" field="last_name" placeholder="Last name" value={formData.last_name} onChange={(e) => updateFormData('last_name', e.target.value)} errors={errors} />
      </div>
      <InputField icon={Lock} label="Password" type="password" field="password1" placeholder="Create password" value={formData.password1} onChange={(e) => updateFormData('password1', e.target.value)} errors={errors} />
      <InputField icon={Lock} label="Confirm Password" type="password" field="password2" placeholder="Confirm password" value={formData.password2} onChange={(e) => updateFormData('password2', e.target.value)} errors={errors} />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-4">
          {['client', 'lawyer'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => updateFormData('user_type', type)}
              className={`p-4 border rounded-lg text-center ${
                formData.user_type === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {type === 'client' ? <User className="mx-auto mb-1" /> : <Scale className="mx-auto mb-1" />}
              <p className="font-medium capitalize">{type}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <InputField icon={Scale} label="License Number" field="license_number" value={formData.license_number} onChange={(e) => updateFormData('license_number', e.target.value)} errors={errors} />
      <InputField icon={Calendar} label="Bar Admission Date" type="date" field="bar_admission_date" value={formData.bar_admission_date} onChange={(e) => updateFormData('bar_admission_date', e.target.value)} errors={errors} />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Areas <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
          {practiceAreas.map(area => (
            <button
              key={area.id}
              type="button"
              onClick={() => togglePracticeArea(area.id)}
              className={`p-2 text-sm rounded border ${
                formData.practice_areas.includes(area.id) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>
        {errors.practice_areas && <p className="mt-1 text-sm text-red-500">{errors.practice_areas}</p>}
      </div>
      <TextareaField icon={FileText} label="Biography" field="biography" value={formData.biography} onChange={(e) => updateFormData('biography', e.target.value)} errors={errors} />
      <TextareaField icon={GraduationCap} label="Education" field="education" value={formData.education} onChange={(e) => updateFormData('education', e.target.value)} errors={errors} />
      <InputField icon={DollarSign} label="Hourly Rate (USD)" type="number" field="consultation_fee" value={formData.consultation_fee} onChange={(e) => updateFormData('consultation_fee', e.target.value)} errors={errors} />
      <TextareaField icon={MapPin} label="Office Address" field="office_address" value={formData.office_address} onChange={(e) => updateFormData('office_address', e.target.value)} errors={errors} />
    </>
  );

  const totalSteps = formData.user_type === 'lawyer' ? 2 : 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-blue-100 mb-4">
            {currentStep === 1 ? 'Basic Information' : 'Lawyer Profile'}
          </p>
          <div className="w-full bg-blue-800 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="p-6">
          {errors.general && <p className="text-sm text-red-600 mb-4">{errors.general}</p>}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrevious}
              className={`flex items-center px-4 py-2 border rounded-lg ${
                currentStep === 1 ? 'invisible' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : currentStep === totalSteps ? "Create Account" : "Next"}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>

        <div className="text-center py-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
