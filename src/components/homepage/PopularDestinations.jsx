import React from 'react'

export default function PopularDestinations() {
    return (
        <>
            <section className=" mx-auto px-margin-mobile md:px-margin pt-20 pb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                            <span className="material-symbols-outlined text-[18px]">explore</span>
                            <span>CURATED GEOGRAPHIES</span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                            Explore Popular Destinations
                        </h2>
                        <p className="font-body-md text-body-md text-text-secondary mt-1">
                            Discover some of the most sought-after places to stay across key metropolitan and coastal getaways.
                        </p>
                    </div>
                    <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="/search?destination=all">
                        <span>View all 120+ destinations</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Lagos">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Modern waterfront skyscrapers and luxury hotels of Victoria Island Lagos Nigeria reflected in calm turquoise lagoon water under brilliant golden hour light with private yachts"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1F1ZAEIVkyJGVcqe-iCjRuPXs_ca3lAVywyAVxi-uh4Pk1xaXfR1HS4DdTklJtfgRiFHZWMwh86DixSW7rLtExgcZFlHQpHSR7isa9tdQIQEmXbOBYbuvqYBbNRjpVWWdzG3rW4wqBs3tHdEVG7fR7z-kwp4WHHfUPZ4oYyX_Kjb_PxpyN9hGN7MFlNcozo6rkXGn7nktU858tJOwSxpv-JsJcbnUcqP9ke-CuRbC')",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span className='text-1xl'> 148 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>Nigeria</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Lagos</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">Victoria Island, Ikoyi, Lekki Peninsula &amp; Eko Atlantic</p>
                        </div>
                    </a>

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Abuja">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Lush green botanical hills with luxury five star hotel suites and grand diplomatic architecture in Abuja Nigeria framed by Zuma Rock silhouette under clear afternoon sky"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuColCo054_KpcRttjkU_k8laa9DsbNFZ1V4YpFFQlQUbCjyb9J8Dk7FV_c9IHMszQ_LdySR4HgdkQMiYDD-WUjV5B4n378-2cI002421s2haADArV7IoOCGU5ZM2yaua0JfwMMfhEk4yanLSK2O0SBLlnKeM48GDDvo66ZE6QWGnbx1oPZvIa3l5RTdUOqOA6ytnXW-YgnX-g5V-jfJdRAcEpgw5ubGf5KzvjDskuBh')",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span>86 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>Nigeria</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Abuja</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">Maitama, Asokoro, Central District &amp; Garki</p>
                        </div>
                    </a>

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Port+Harcourt">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Peaceful riverside garden resort hotel along Port Harcourt Nigeria river with cabanas, palm trees, warm evening patio lanterns and private boat dock" style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuColCo054_KpcRttjkU_k8laa9DsbNFZ1V4YpFFQlQUbCjyb9J8Dk7FV_c9IHMszQ_LdySR4HgdkQMiYDD-WUjV5B4n378-2cI002421s2haADArV7IoOCGU5ZM2yaua0JfwMMfhEk4yanLSK2O0SBLlnKeM48GDDvo66ZE6QWGnbx1oPZvIa3l5RTdUOqOA6ytnXW-YgnX-g5V-jfJdRAcEpgw5ubGf5KzvjDskuBh')",
                        }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span>42 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>Nigeria</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Port Harcourt</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">Old GRA, Peter Odili Road &amp; Trans-Amadi</p>
                        </div>
                    </a>

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Owerri">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Vibrant tropical leisure boutique hotel courtyard in Owerri Nigeria with illuminated blue pool, stone pathways, manicured tropical flora and comfortable outdoor lounge seating"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuColCo054_KpcRttjkU_k8laa9DsbNFZ1V4YpFFQlQUbCjyb9J8Dk7FV_c9IHMszQ_LdySR4HgdkQMiYDD-WUjV5B4n378-2cI002421s2haADArV7IoOCGU5ZM2yaua0JfwMMfhEk4yanLSK2O0SBLlnKeM48GDDvo66ZE6QWGnbx1oPZvIa3l5RTdUOqOA6ytnXW-YgnX-g5V-jfJdRAcEpgw5ubGf5KzvjDskuBh')",
                            }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span>29 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>Nigeria</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Owerri</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">New Owerri, World Bank Layout &amp; Concorde Blvd</p>
                        </div>
                    </a>

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Dubai">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Sensational rooftop glass infinity pool in Downtown Dubai overlooking illuminated Burj Khalifa skyline at twilight with modern cocktail lounge and sleek sun loungers"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuColCo054_KpcRttjkU_k8laa9DsbNFZ1V4YpFFQlQUbCjyb9J8Dk7FV_c9IHMszQ_LdySR4HgdkQMiYDD-WUjV5B4n378-2cI002421s2haADArV7IoOCGU5ZM2yaua0JfwMMfhEk4yanLSK2O0SBLlnKeM48GDDvo66ZE6QWGnbx1oPZvIa3l5RTdUOqOA6ytnXW-YgnX-g5V-jfJdRAcEpgw5ubGf5KzvjDskuBh')",
                            }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span>320 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>United Arab Emirates</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Dubai</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">Downtown, Palm Jumeirah, Dubai Marina &amp; DIFC</p>
                        </div>
                    </a>

                    <a className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" href="/search?destination=Accra">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Chic coastal contemporary beachfront hotel in Accra Ghana with ocean view veranda, natural teak wood furniture, swaying coconut trees and golden Atlantic waves"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuColCo054_KpcRttjkU_k8laa9DsbNFZ1V4YpFFQlQUbCjyb9J8Dk7FV_c9IHMszQ_LdySR4HgdkQMiYDD-WUjV5B4n378-2cI002421s2haADArV7IoOCGU5ZM2yaua0JfwMMfhEk4yanLSK2O0SBLlnKeM48GDDvo66ZE6QWGnbx1oPZvIa3l5RTdUOqOA6ytnXW-YgnX-g5V-jfJdRAcEpgw5ubGf5KzvjDskuBh')",
                            }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md font-label-sm text-label-sm text-text-primary shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">apartment</span>
                            <span>54 Hotels</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                <span>Ghana</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-surface font-bold">Accra</h3>
                            <p className="font-body-sm text-body-sm text-surface-variant mt-1 line-clamp-1">Airport Residential, Cantonments, Osu &amp; Labadi</p>
                        </div>
                    </a>
                </div>
            </section>
        </>
    )
}
