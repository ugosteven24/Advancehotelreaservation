"use client";

import "./currency.css";

import { useState } from "react";
import Link from "next/link";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaSave,
    FaMoneyBillWave,
    FaCoins,
    FaDollarSign,
    FaExchangeAlt,
    FaGlobe,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function CurrencySettings() {

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [settings, setSettings] = useState({

        defaultCurrency: "NGN",

        currencySymbol: "₦",

        symbolPosition: "Before",

        decimalPlaces: 2,

        thousandSeparator: ",",

        decimalSeparator: ".",

        exchangeRateApi: "",

        autoUpdateRate: false,

        supportedCurrencies: [
            "NGN",
            "USD",
            "EUR",
            "GBP",
        ],

    });

    const showToast = (

        message,
        type = "success"

    ) => {

        setToast({

            show: true,
            message,
            type,

        });

        setTimeout(() => {

            setToast({

                show: false,
                message: "",
                type: "success",

            });

        }, 3000);

    };

    const handleChange = (e) => {

        const {

            name,
            value,
            type,
            checked,

        } = e.target;

        setSettings({

            ...settings,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        });

    };

    const handleCurrencies = (currency) => {

        if (

            settings.supportedCurrencies.includes(

                currency

            )

        ) {

            setSettings({

                ...settings,

                supportedCurrencies:

                    settings.supportedCurrencies.filter(

                        item => item !== currency

                    ),

            });

        }

        else {

            setSettings({

                ...settings,

                supportedCurrencies: [

                    ...settings.supportedCurrencies,

                    currency,

                ],

            });

        }

    };

    const saveSettings = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await setDoc(

                doc(

                    db,

                    "settings",

                    "currency"

                ),

                {

                    ...settings,

                    updatedAt:

                        serverTimestamp(),

                }

            );

            showToast(

                "Currency settings saved successfully."

            );

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to save settings.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="content-wrapper currency-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Currency Settings

                    </h1>

                    <p>

                        Configure currencies and exchange rate options.

                    </p>

                </div>

                <Link

                    href="/superadmin/settings"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form

                className="currency-form"

                onSubmit={saveSettings}

            >

                {/* Default Currency */}

                <div className="settings-card">

                    <h3>

                        <FaMoneyBillWave />

                        Default Currency

                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Currency

                            </label>

                            <select

                                name="defaultCurrency"

                                value={settings.defaultCurrency}

                                onChange={handleChange}

                            >

                                <option value="NGN">NGN</option>

                                <option value="USD">USD</option>

                                <option value="EUR">EUR</option>

                                <option value="GBP">GBP</option>

                                <option value="CAD">CAD</option>

                                <option value="AUD">AUD</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Currency Symbol

                            </label>

                            <input

                                type="text"

                                name="currencySymbol"

                                value={settings.currencySymbol}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>

                {/* Formatting */}

                <div className="settings-card">

                    <h3>

                        <FaCoins />

                        Number Formatting

                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Symbol Position

                            </label>

                            <select

                                name="symbolPosition"

                                value={settings.symbolPosition}

                                onChange={handleChange}

                            >

                                <option>

                                    Before

                                </option>

                                <option>

                                    After

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Decimal Places

                            </label>

                            <input

                                type="number"

                                name="decimalPlaces"

                                value={settings.decimalPlaces}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Thousand Separator

                            </label>

                            <input

                                type="text"

                                name="thousandSeparator"

                                value={settings.thousandSeparator}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Decimal Separator

                            </label>

                            <input

                                type="text"

                                name="decimalSeparator"

                                value={settings.decimalSeparator}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>

                {/* Exchange Rate */}

                <div className="settings-card">

                    <h3>

                        <FaExchangeAlt />

                        Exchange Rate

                    </h3>

                    <div className="form-group">

                        <label>

                            Exchange Rate API URL

                        </label>

                        <input

                            type="text"

                            name="exchangeRateApi"

                            value={settings.exchangeRateApi}

                            onChange={handleChange}

                            placeholder="https://..."

                        />

                    </div>

                    <div className="switch-row">

                        <div>

                            <h4>

                                Auto Update Exchange Rates

                            </h4>

                            <p>

                                Automatically update exchange rates daily.

                            </p>

                        </div>

                        <input

                            type="checkbox"

                            name="autoUpdateRate"

                            checked={settings.autoUpdateRate}

                            onChange={handleChange}

                        />

                    </div>

                </div>

                {/* Supported Currencies */}

                <div className="settings-card">

                    <h3>

                        <FaGlobe />

                        Supported Currencies

                    </h3>

                    <div className="checkbox-grid">

                        {

                            [

                                "NGN",

                                "USD",

                                "EUR",

                                "GBP",

                                "CAD",

                                "AUD",

                                "JPY",

                                "CNY",

                                "ZAR",

                                "KES",

                            ].map(currency => (

                                <label

                                    key={currency}

                                    className="checkbox-item"

                                >

                                    <input

                                        type="checkbox"

                                        checked={

                                            settings.supportedCurrencies.includes(

                                                currency

                                            )

                                        }

                                        onChange={() =>

                                            handleCurrencies(

                                                currency

                                            )

                                        }

                                    />

                                    <span>

                                        {currency}

                                    </span>

                                </label>

                            ))

                        }

                    </div>

                </div>

                <div className="form-actions">

                    <button

                        className="save-btn"

                        disabled={loading}

                    >

                        <FaSave />

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