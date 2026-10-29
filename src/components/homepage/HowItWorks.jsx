import React from 'react'

export default function HowItWorks() {
    return (
        <>
          
            <section className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                        <span className="material-symbols-outlined text-[18px]">route</span>
                        <span>EFFORTLESS JOURNEY</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                        How HotelReserve Works
                    </h2>
                    <p className="font-body-md text-body-md text-text-secondary mt-2">
                        From initial inspiration to your hotel room key in three intuitive steps.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                
                    <div className="relative bg-surface-card rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary font-display text-title font-bold flex items-center justify-center shadow-md mb-6">
                            01
                        </div>
                        <h3 className="font-title text-title text-text-primary font-bold mb-2">Search</h3>
                        <p className="font-body-sm text-body-sm text-text-secondary">
                            Enter your destination, stay dates, and guest preferences in our fast search engine with verified live room availability.
                        </p>
                    </div>
                  
                    <div className="relative bg-surface-card rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary font-display text-title font-bold flex items-center justify-center shadow-md mb-6">
                            02
                        </div>
                        <h3 className="font-title text-title text-text-primary font-bold mb-2">Choose</h3>
                        <p className="font-body-sm text-body-sm text-text-secondary">
                            Compare hotels, verified room specs, transparent rates, guest reviews, and flexible cancellation policies side-by-side.
                        </p>
                    </div>
                 
                    <div className="relative bg-surface-card rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-success-deal text-on-primary font-display text-title font-bold flex items-center justify-center shadow-md mb-6">
                            03
                        </div>
                        <h3 className="font-title text-title text-text-primary font-bold mb-2">Book</h3>
                        <p className="font-body-sm text-body-sm text-text-secondary">
                            Complete your reservation in under 2 minutes and receive your official digital voucher and directions instantly.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
