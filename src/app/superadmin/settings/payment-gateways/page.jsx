"use client";

import "./payment-gateway.css";

import { useState } from "react";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import Link from "next/link";

import {
    FaArrowLeft,
    FaSave,
    FaCreditCard,
    FaUniversity,
    FaPaypal,
    FaMoneyBillWave,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function PaymentGatewaySettings() {

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show:false,
        message:"",
        type:"success",
    });

    const [settings,setSettings] = useState({

        flutterwaveEnabled:true,
        flutterwavePublicKey:"",
        flutterwaveSecretKey:"",

        paystackEnabled:true,
        paystackPublicKey:"",
        paystackSecretKey:"",

        stripeEnabled:false,
        stripePublicKey:"",
        stripeSecretKey:"",

        paypalEnabled:false,
        paypalClientId:"",
        paypalSecret:"",

        bankTransfer:false,
        cashOnArrival:false,

    });

    const showToast=(message,type="success")=>{

        setToast({
            show:true,
            message,
            type,
        });

        setTimeout(()=>{

            setToast({
                show:false,
                message:"",
                type:"success",
            });

        },3000);

    };

    const handleChange=(e)=>{

        const {name,value,type,checked}=e.target;

        setSettings({

            ...settings,

            [name]:
                type==="checkbox"
                    ?checked
                    :value,

        });

    };

    const saveSettings=async(e)=>{

        e.preventDefault();

        try{

            setLoading(true);

            await setDoc(

                doc(
                    db,
                    "settings",
                    "paymentGateway"
                ),

                {

                    ...settings,

                    updatedAt:serverTimestamp(),

                }

            );

            showToast(
                "Payment gateway settings saved."
            );

        }

        catch(err){

            console.log(err);

            showToast(
                "Unable to save settings.",
                "error"
            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="content-wrapper payment-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>
                        Payment Gateway Settings
                    </h1>

                    <p>
                        Configure all payment providers.
                    </p>

                </div>

                <Link
                    href="/superadmin/settings"
                    className="back-btn"
                >

                    <FaArrowLeft/>

                    Back

                </Link>

            </div>

            <form
                className="payment-form"
                onSubmit={saveSettings}
            >

                {/* Flutterwave */}

                <div className="settings-card">

                    <h3>

                        <FaCreditCard/>

                        Flutterwave

                    </h3>

                    <div className="switch-row">

                        <span>Enable Flutterwave</span>

                        <input
                            type="checkbox"
                            name="flutterwaveEnabled"
                            checked={settings.flutterwaveEnabled}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Public Key</label>

                        <input
                            name="flutterwavePublicKey"
                            value={settings.flutterwavePublicKey}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Secret Key</label>

                        <input
                            name="flutterwaveSecretKey"
                            value={settings.flutterwaveSecretKey}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Paystack */}

                <div className="settings-card">

                    <h3>

                        <FaMoneyBillWave/>

                        Paystack

                    </h3>

                    <div className="switch-row">

                        <span>Enable Paystack</span>

                        <input
                            type="checkbox"
                            name="paystackEnabled"
                            checked={settings.paystackEnabled}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Public Key</label>

                        <input
                            name="paystackPublicKey"
                            value={settings.paystackPublicKey}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Secret Key</label>

                        <input
                            name="paystackSecretKey"
                            value={settings.paystackSecretKey}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Stripe */}

                <div className="settings-card">

                    <h3>Stripe</h3>

                    <div className="switch-row">

                        <span>Enable Stripe</span>

                        <input
                            type="checkbox"
                            name="stripeEnabled"
                            checked={settings.stripeEnabled}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Publishable Key</label>

                        <input
                            name="stripePublicKey"
                            value={settings.stripePublicKey}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Secret Key</label>

                        <input
                            name="stripeSecretKey"
                            value={settings.stripeSecretKey}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="settings-card">

                    <h3>

                        <FaPaypal/>

                        PayPal

                    </h3>

                    <div className="switch-row">

                        <span>Enable PayPal</span>

                        <input
                            type="checkbox"
                            name="paypalEnabled"
                            checked={settings.paypalEnabled}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Client ID</label>

                        <input
                            name="paypalClientId"
                            value={settings.paypalClientId}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Secret</label>

                        <input
                            name="paypalSecret"
                            value={settings.paypalSecret}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="settings-card">

                    <h3>

                        <FaUniversity/>

                        Offline Payments

                    </h3>

                    <div className="switch-row">

                        <span>Enable Bank Transfer</span>

                        <input
                            type="checkbox"
                            name="bankTransfer"
                            checked={settings.bankTransfer}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="switch-row">

                        <span>Enable Cash on Arrival</span>

                        <input
                            type="checkbox"
                            name="cashOnArrival"
                            checked={settings.cashOnArrival}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        className="save-btn"
                        disabled={loading}
                    >

                        <FaSave/>

                        {
                            loading
                                ? "Saving..."
                                : "Save Settings"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}