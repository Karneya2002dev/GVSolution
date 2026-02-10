import { useState } from "react";
import { Plus, Pencil, Trash2, CreditCard, X } from "lucide-react";

const initialPlans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 29.99,
    duration: "12 months",
    description: "Perfect for individuals starting their membership journey",
    benefits: [
      "Access to basic features",
      "Monthly newsletter",
      "Community forum access",
      "Email support",
    ],
    active: true,
  },
  {
    id: 2,
    name: "Premium Plan",
    price: 99.99,
    duration: "12 months",
    description: "For members who want the complete experience",
    benefits: [
      "All Basic Plan features",
      "Priority support",
      "Exclusive events access",
      "Advanced analytics",
      "Personal account manager",
    ],
    active: true,
  },
];

const Memberships = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    benefits: "",
    active: true,
  });

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setEditId(null);
    setForm({
      name: "",
      price: "",
      duration: "",
      description: "",
      benefits: "",
      active: true,
    });
    setOpen(true);
  };

  const openEdit = (plan) => {
    setEditId(plan.id);
    setForm({
      ...plan,
      benefits: plan.benefits.join(", "),
    });
    setOpen(true);
  };

  const savePlan = () => {
    const payload = {
      ...form,
      price: Number(form.price),
      benefits: form.benefits.split(",").map((b) => b.trim()),
    };

    if (editId) {
      setPlans(plans.map(p => p.id === editId ? { ...payload, id: editId } : p));
    } else {
      setPlans([...plans, { ...payload, id: Date.now() }]);
    }
    setOpen(false);
  };

  const deletePlan = (id) => {
    if (window.confirm("Delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setPlans(plans.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Membership Plans</h2>
          <p className="text-sm text-gray-500">Create and manage membership plans</p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black"
        >
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white border rounded-xl p-6 shadow-sm">

            {/* Card Header */}
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <button
                    onClick={() => toggleStatus(plan.id)}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      plan.active
                        ? "bg-slate-900 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {plan.active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEdit(plan)} className="hover:text-blue-600">
                  <Pencil size={16} />
                </button>
                <button onClick={() => deletePlan(plan.id)} className="hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-3">{plan.description}</p>

            <p className="text-2xl font-bold mb-4">
              ${plan.price} <span className="text-sm text-gray-500">/ {plan.duration}</span>
            </p>

            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {plan.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {editId ? "Edit Plan" : "Add Plan"}
              </h3>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <input className="input" placeholder="Plan Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input className="input" placeholder="Price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
              <input className="input" placeholder="Duration (e.g. 12 months)"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
              />
              <textarea className="input" placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <textarea className="input" placeholder="Benefits (comma separated)"
                value={form.benefits}
                onChange={e => setForm({ ...form, benefits: e.target.value })}
              />

              <button
                onClick={savePlan}
                className="w-full bg-slate-900 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Memberships;
