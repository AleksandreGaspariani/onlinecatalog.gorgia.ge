import React, { useEffect, useState } from 'react'
import profile from '../../assets/css/Profile.module.css'
import axios from 'axios'
import defaultInstance from '../../api/defaultInstance'

const Profile = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        contact_phone: '',
        contact_email: '',
        contact_address: '',
        contact_tin: '',
        contact_iban: '',
        contact_name: ''
    });
    const [loading, setLoading] = useState(true);
    const [warning, setWarning] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        defaultInstance.get('/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        }).then(res => {
            if (res.data) {
                setForm(res.data);
                setWarning(Object.values(res.data).some(v => !v));
            } else {
                setWarning(true);
            }
            setLoading(false);
        }).catch(() => {
            setWarning(true);
            setLoading(false);
        });
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setValidationErrors({});
        try {
            await defaultInstance.post('/profile', form, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setWarning(false);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationErrors(error.response.data.errors || {});
                setWarning(true);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className={profile.container}>
            <h1 className={profile.title}>მომხმარებლის პარამეტრები</h1>
            {warning && <div style={{ color: 'red', marginBottom: 10 }}>გთხოვთ შეავსოთ ყველა ველი!</div>}
            {Object.keys(validationErrors).length > 0 && (
                <div style={{ color: 'red', marginBottom: 10 }}>
                    {Object.entries(validationErrors).map(([field, errors]) =>
                        <div key={field}>{errors.join(', ')}</div>
                    )}
                </div>
            )}
            <form className={profile.form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <div className={profile.column}>
                        <div className={profile.formGroup}>
                            <label>სახელი</label>
                            <input name="name" type="text" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>ტელეფონის ნომერი</label>
                            <input name="phone" type="text" value={form.phone} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის ტელეფონის ნომერი</label>
                            <input name="contact_phone" type="text" value={form.contact_phone} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის ელ. ფოსტა</label>
                            <input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className={profile.column}>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის მისამართი</label>
                            <input name="contact_address" type="text" value={form.contact_address} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის TIN</label>
                            <input name="contact_tin" type="text" value={form.contact_tin} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის IBAN</label>
                            <input name="contact_iban" type="text" value={form.contact_iban} onChange={handleChange} required />
                        </div>
                        <div className={profile.formGroup}>
                            <label>კონტაქტორის სახელი</label>
                            <input name="contact_name" type="text" value={form.contact_name} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                <div className="submit-button" style={{ flexDirection: 'column' }}>
                    <button className={profile.button} type="submit" style={{}}>განახლება</button>
                </div>
            </form>
        </div>
    )
}

export default Profile