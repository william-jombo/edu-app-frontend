import { useState, useEffect } from 'react';
import { User, Users, Activity, BookOpen, X, Send, Loader2 } from 'lucide-react';
import { get, post } from '../../utils/api';
import ModalHeader from '../edit/ModalHeader';
import SectionHeader from '../edit/SectionHeader';
import FormInput from '../edit/FormInput';
import FormSelect from '../edit/FormSelect';
import FormTextarea from '../edit/FormTextarea';

// ── Shared field style (same as rest of app) ─────────────────────────────────
const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400";

const GENDER_OPTIONS = [
  { value: '',       label: 'Select Gender' },
  { value: 'male',   label: 'Male'          },
  { value: 'female', label: 'Female'        },
  { value: 'other',  label: 'Other'         },
];

const STATUS_OPTIONS = [
  { value: 'active',    label: 'Active'    },
  { value: 'inactive',  label: 'Inactive'  },
  { value: 'graduated', label: 'Graduated' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

const EMPTY = {
  firstname: '', lastname: '', email: '', password: '',
  student_number: '', phone: '', class_id: '',
  date_of_birth: '', gender: '', address: '',
  guardian_name: '', guardian_phone: '', status: 'active',
};

/**
 * StudentFormModal
 * mode="add"  → shows password + subjects, POSTs to add_student.php
 * mode="edit" → prefilled, no subjects picker, POSTs to update_student.php
 */
function StudentFormModal({ mode = 'add', student = null, onSuccess, onClose }) {
  const isAdd = mode === 'add';

  const [formData, setFormData]               = useState(isAdd ? EMPTY : {
    id:             student.id,
    firstname:      student.firstname      || '',
    lastname:       student.lastname       || '',
    email:          student.email          || '',
    password:       '',
    student_number: student.student_number || '',
    phone:          student.phone          || '',
    class_id:       student.class_id       || '',
    date_of_birth:  student.date_of_birth  || '',
    gender:         student.gender         || '',
    address:        student.address        || '',
    guardian_name:  student.guardian_name  || '',
    guardian_phone: student.guardian_phone || '',
    status:         student.status         || 'active',
  });

  const [classes,           setClasses]           = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjects,  setSelectedSubjects]  = useState([]);
  const [loading,           setLoading]           = useState(false);
  const [loadingData,       setLoadingData]       = useState(isAdd);
  const [error,             setError]             = useState('');

  const set = (k, v) => setFormData(prev => ({ ...prev, [k]: v }));
  const handleChange = e => set(e.target.name, e.target.value);
  const toggleSubject = id => setSelectedSubjects(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  // Load classes (always) + subjects (add mode only)
  useEffect(() => {
    const load = async () => {
      try {
        const classRes = await get('/api/common/get_classes.php');
        const cd = await classRes.json();
        if (cd.success) setClasses(cd.data || cd.classes || []);

        if (isAdd) {
          const subRes = await get('/api/common/get_available_subjects.php');
          const sd = await subRes.json();
          if (sd.success) setAvailableSubjects(sd.subjects || []);
        }
      } catch (err) {
        setError('Failed to load form data');
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [isAdd]);

  const handleSubmit = async () => {
    setError('');
    const { firstname, lastname, email, password, student_number, class_id } = formData;
    if (!firstname || !lastname || !email || !student_number || !class_id)
      return setError('Please fill in all required fields');
    if (isAdd && !password)
      return setError('Password is required');
    if (isAdd && selectedSubjects.length < 7)
      return setError('Please select at least 7 subjects');

    setLoading(true);
    try {
      const payload = isAdd
        ? { ...formData, class_id: parseInt(formData.class_id), subjects: selectedSubjects }
        : { ...formData, class_id: formData.class_id ? parseInt(formData.class_id) : null };

      const endpoint = isAdd
        ? '/api/admin/add_student.php'
        : '/api/admin/update_student.php';

      const res  = await post(endpoint, payload);
      const data = await res.json();

      if (data.success) onSuccess(data.message || (isAdd ? 'Student added!' : 'Student updated!'));
      else setError(data.message || 'Operation failed');
    } catch (err) {
      setError(err.message || 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  const remaining = Math.max(0, 7 - selectedSubjects.length);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        <ModalHeader
          icon={User}
          title={isAdd ? 'Add New Student' : 'Edit Student'}
          subtitle={isAdd ? 'Register a student into the system' : 'Update student information'}
          onClose={onClose}
        />

        {loadingData ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
              </div>
              <p className="text-xs font-semibold text-slate-400">Loading form data…</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

            {/* Error */}
            {error && (
              <div className="px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            {/* ── Personal Info ── */}
            <SectionHeader icon={User} title="Personal Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormInput label="First Name"     name="firstname"      value={formData.firstname}      onChange={handleChange} required />
              <FormInput label="Last Name"      name="lastname"       value={formData.lastname}       onChange={handleChange} required />
              <FormInput label="Email"          name="email"          value={formData.email}          onChange={handleChange} type="email" required />
              <FormInput
                label={isAdd ? 'Password' : 'New Password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required={isAdd}
                placeholder={isAdd ? '' : 'Leave blank to keep current'}
              />
              <FormInput label="Student Number" name="student_number" value={formData.student_number} onChange={handleChange} required />
              <FormInput label="Phone"          name="phone"          value={formData.phone}          onChange={handleChange} type="tel" />
              <FormInput label="Date of Birth"  name="date_of_birth"  value={formData.date_of_birth}  onChange={handleChange} type="date" />
              <FormSelect label="Gender"        name="gender"         value={formData.gender}         onChange={handleChange} options={GENDER_OPTIONS} />

              {/* Class dropdown */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Class <span className="text-rose-400">*</span></p>
                <select name="class_id" value={formData.class_id} onChange={handleChange} className={f + " appearance-none"}>
                  <option value="">Select Class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.class_name}{c.grade_level ? ` - Grade ${c.grade_level}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status (edit only) */}
              {!isAdd && (
                <FormSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={STATUS_OPTIONS} />
              )}

              <FormTextarea label="Address" name="address" value={formData.address} onChange={handleChange} rows={2} colSpan="sm:col-span-2" />
            </div>

            {/* ── Guardian ── */}
            <SectionHeader icon={Users} title="Guardian Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormInput label="Guardian Name"  name="guardian_name"  value={formData.guardian_name}  onChange={handleChange} />
              <FormInput label="Guardian Phone" name="guardian_phone" value={formData.guardian_phone} onChange={handleChange} type="tel" />
            </div>

            {/* ── Subjects (add mode only) ── */}
            {isAdd && (
              <>
                <SectionHeader icon={BookOpen} title="Subject Enrollment" />

                {/* Requirement badge */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${
                  selectedSubjects.length >= 7
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    : 'bg-amber-50 border-amber-100 text-amber-700'
                }`}>
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  {selectedSubjects.length >= 7
                    ? `${selectedSubjects.length} subjects selected ✓`
                    : `Select at least 7 subjects · ${remaining} more needed`}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-52 overflow-y-auto bg-slate-50 rounded-xl border border-slate-100 p-2">
                  {availableSubjects.map(subject => {
                    const active = selectedSubjects.includes(subject.id);
                    return (
                      <div key={subject.id} onClick={() => toggleSubject(subject.id)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                          active ? 'border-indigo-300 bg-indigo-50' : 'border-slate-100 bg-white hover:border-indigo-200'
                        }`}>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-700 truncate">{subject.subject_name}</p>
                          <p className="text-[10px] text-slate-400">{subject.subject_code}</p>
                        </div>
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ml-2 ${
                          active ? 'bg-indigo-600' : 'bg-white border border-slate-300'
                        }`}>
                          {active && <span className="text-white text-[8px] font-black">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected chips */}
                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSubjects.map(id => {
                      const s = availableSubjects.find(x => x.id === id);
                      if (!s) return null;
                      return (
                        <span key={id} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                          {s.subject_name}
                          <button onClick={() => toggleSubject(id)} className="hover:text-rose-500 transition-colors">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ── Actions ── */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={onClose}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}>
                {loading
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {isAdd ? 'Adding…' : 'Saving…'}</>
                  : <><Send className="w-3.5 h-3.5" /> {isAdd ? 'Add Student' : 'Save Changes'}</>
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentFormModal;