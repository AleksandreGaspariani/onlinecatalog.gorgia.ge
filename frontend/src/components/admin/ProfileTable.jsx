import React from 'react'
import profile from '../../assets/css/Profile.module.css'

const Profile = () => {
    return (
        <div className={profile.container}>
            <h1 className={profile.title}>მომხმარებლის პარამეტრები</h1>
            <form className={profile.form}>
                <div className={profile.column}>
                    <div className={profile.formGroup}>
                        <label>სახელი</label>
                        <input type="text" readOnly />
                    </div>
                    <div className={profile.formGroup}>
                        <label>ტელეფონის ნომერი</label>
                        <input type="text" readOnly />
                    </div>
                    <div className={profile.formGroup}>
                        <label>კონტაქტორის ტელეფონის ნომერი</label>
                        <input type="text" readOnly />
                    </div>
                    <div className={profile.formGroup}>
                        <label>კონტაქტორის ელ. ფოსტა</label>
                        <input type="email" readOnly />
                    </div>
                </div>
                <div className={profile.column}>
                    <div className={profile.formGroup}>
                        <label>კონტაქტორის მისამართი</label>
                        <input type="text" readOnly />
                    </div>
                    <div className={profile.formGroup}>
                        <label>კონტაქტორის TIN</label>
                        <input type="text" readOnly />
                    </div>
                    <div className={profile.formGroup}>
                        <label>კონტაქტორის სახელი</label>
                        <input type="text" readOnly />
                    </div>
                </div>
            </form>
            <button className={profile.button}>განახლება</button>
        </div>
    )
}

export default Profile