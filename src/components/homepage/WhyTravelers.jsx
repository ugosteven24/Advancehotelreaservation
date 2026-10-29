import React from 'react'

export default function WhyTravelers() {
    return (
        <>
         
            <section className="w-full bg-surface-container-low py-20">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                            <span className="material-symbols-outlined text-[18px]">shield</span>
                            <span>THE HOTELRESERVE ADVANTAGE</span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                            Why Travelers Choose Us
                        </h2>
                        <p className="font-body-md text-body-md text-text-secondary mt-2">
                            We combine cutting-edge technology with high-touch hospitality guarantees for completely worry-free bookings.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       
                        <div className="bg-surface-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-[24px]">touch_app</span>
                            </div>
                            <h3 className="font-title text-title text-text-primary font-bold mb-2">Easy Booking</h3>
                            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                                Find and reserve your stay in just a few simple steps with instant confirmation vouchers delivered directly to your device.
                            </p>
                        </div>
                       
                        <div className="bg-surface-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-success-deal-subtle text-success-deal flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-[24px]">price_check</span>
                            </div>
                            <h3 className="font-title text-title text-text-primary font-bold mb-2">Transparent Pricing</h3>
                            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                                See all taxes, levies, and fees upfront before completing your reservation — guaranteed zero surprise checkout charges.
                            </p>
                        </div>
                      
                        <div className="bg-surface-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-[24px]">verified_user</span>
                            </div>
                            <h3 className="font-title text-title text-text-primary font-bold mb-2">Trusted Choices</h3>
                            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                                Compare hotels using authentic guest ratings, real room photography, verified amenities, and clear flexible cancellation policies.
                            </p>
                        </div>
                      
                        <div className="bg-surface-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-[24px]">support_agent</span>
                            </div>
                            <h3 className="font-title text-title text-text-primary font-bold mb-2">Simple Management</h3>
                            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                                View, modify, or cancel your reservations anytime with 24/7 dedicated concierge assistance via phone, WhatsApp, or email.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
