import React from 'react'

export default function GreatStays() {
    return (
        <>
     
            <section className="w-full max-w-full mx-auto px-margin-mobile md:px-margin py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                            <span className="material-symbols-outlined text-[18px]">local_offer</span>
                            <span>CURATED OFFERS</span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                            Great Stays. Better Deals.
                        </h2>
                        <p className="font-body-md text-body-md text-text-secondary mt-1">
                            Discover special offers on selected hotels, waterfront sanctuaries, and extended retreats.
                        </p>
                    </div>
                    <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="#">
                        <span>View all current offers</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   
                    <div className="relative bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-8 flex flex-col justify-between shadow-lg overflow-hidden group">
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-surface-card/10 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-surface-card/20 backdrop-blur-md text-surface font-label-sm text-label-sm mb-6">
                                WEEKEND SPECIAL
                            </span>
                            <h3 className="font-headline-md text-headline-md font-bold leading-snug">
                                Up to 20% Off Weekend Escapes
                            </h3>
                            <p className="mt-3 font-body-md text-body-md text-primary-fixed-dim">
                                Valid for bookings through November across top Lagos waterfront hotels. Recharge with complimentary Sunday late checkout.
                            </p>
                        </div>
                        <div className="pt-8">
                            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface text-primary font-label-md text-label-md hover:bg-surface-bright transition-colors shadow-sm" href="#">
                                <span>Explore Deal</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                   
                    <div className="relative bg-gradient-to-br from-inverse-surface to-text-primary text-surface rounded-2xl p-8 flex flex-col justify-between shadow-lg overflow-hidden group">
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-surface-card/10 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-surface-card/20 backdrop-blur-md text-surface font-label-sm text-label-sm mb-6">
                                ADVANCE PURCHASE
                            </span>
                            <h3 className="font-headline-md text-headline-md font-bold leading-snug">
                                Early Booking Privilege
                            </h3>
                            <p className="mt-3 font-body-md text-body-md text-text-muted">
                                Reserve 30+ days in advance and unlock complimentary breakfast &amp; VIP airport concierge lounge access across premier partners.
                            </p>
                        </div>
                        <div className="pt-8">
                            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface text-text-primary font-label-md text-label-md hover:bg-surface-bright transition-colors shadow-sm" href="#">
                                <span>View Advance Offers</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                 
                    <div className="relative bg-gradient-to-br from-tertiary to-tertiary-container text-on-tertiary rounded-2xl p-8 flex flex-col justify-between shadow-lg overflow-hidden group">
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-surface-card/10 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-surface-card/20 backdrop-blur-md text-surface font-label-sm text-label-sm mb-6">
                                LONG RETREAT
                            </span>
                            <h3 className="font-headline-md text-headline-md font-bold leading-snug">
                                Extended Stay Savings
                            </h3>
                            <p className="mt-3 font-body-md text-body-md text-tertiary-fixed">
                                Stay 5 nights or more and receive 25% off luxury executive suites, complete with daily laundry and dedicated office workspace.
                            </p>
                        </div>
                        <div className="pt-8">
                            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface text-tertiary font-label-md text-label-md hover:bg-surface-bright transition-colors shadow-sm" href="#">
                                <span>Explore Extended Stays</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
