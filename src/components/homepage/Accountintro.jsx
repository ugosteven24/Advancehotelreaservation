import React from 'react'
import {
  ShieldCheck,
  Headset,
  Star,
  X,
} from "lucide-react";

export default function Accountintro() {
  return (
   <>
   <h1 className='text-3xl'>Your account, your travel</h1>
         <section className="resort-promises">
        <div>
          <ShieldCheck size={29} />
          <span>
            <strong>Secure Booking</strong>
            <small>Your data is always protected</small>
          </span>
        </div>

        <div>
          <Headset size={29} />
          <span>
            <strong>Customer Support</strong>
            <small>We're here to help</small>
          </span>
        </div>

        <div>
          <Star size={29} />
          <span>
            <strong>Find Your Stay</strong>
            <small>Explore available resort options</small>
          </span>
        </div>
      </section>
   </>
  )
}
