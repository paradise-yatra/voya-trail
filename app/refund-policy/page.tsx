import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | Voya Trail",
  description: "Read the Voya Trail refund policy.",
}

export default function RefundPolicyPage() {
  return (
    <main className="bg-white pt-40 text-slate-900 sm:pt-44">
      <section className="flex min-h-[36vh] items-center justify-center bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#8B0000] sm:text-5xl md:text-6xl">
            Refund Policy
          </h1>
          <p className="mt-6 text-sm font-medium text-slate-500">
            Last Updated: March 27, 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-10 text-sm leading-7 text-slate-700 sm:text-[15px]">
            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Booking Confirmation</h2>
              <p>
                A booking with Voya Trail shall be considered confirmed only after receipt of the required
                advance payment.
              </p>
              <p>
                The balance amount must be fully paid before the commencement of travel.
              </p>
              <p>
                By making any payment, the customer agrees to this Cancellation and Refund Policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Cancellation by Customer</h2>
              <p>
                All cancellation requests must be submitted in writing through the official Voya Trail
                email address or the registered WhatsApp number communicated by us.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Holiday Packages (Domestic and International)</h2>
              <p>
                30 days or more before departure: 25% of the total package cost will be charged as a
                cancellation fee.
              </p>
              <p>
                15 to 20 days before departure: 50% of the total package cost will be charged as a
                cancellation fee.
              </p>
              <p>
                Within 15 days of departure or in case of No Show: 100% cancellation charges will apply
                and no refund will be available.
              </p>
              <p>
                Cancellation charges are always calculated on the total package cost and not merely on the
                advance amount paid.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Flight Tickets</h2>
              <p>
                Flight ticket cancellations are strictly governed by the respective airline&apos;s
                cancellation policy.
              </p>
              <p>
                Voya Trail will refund only the amount actually received from the airline after deduction
                of applicable service charges or supplier-imposed fees.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Hotel Bookings</h2>
              <p>
                Refund eligibility for hotel bookings depends entirely on the cancellation policy of the
                respective hotel or accommodation provider.
              </p>
              <p>
                Non-refundable hotel bookings are not eligible for any refund.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Visa, Insurance and Processing Charges</h2>
              <p>
                Visa fees, travel insurance charges, documentation charges, processing charges, and other
                service fees are strictly non-refundable, including in cases of visa rejection or
                cancellation by the customer.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">No Show Policy</h2>
              <p>
                Failure to report on the date of departure will be treated as a No Show and 100%
                cancellation charges will apply.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Refund Processing Timeline</h2>
              <p>
                All eligible refunds will be processed within 45 working days from the date on which the
                cancellation is approved.
              </p>
              <p>
                Refunds will be made through the original mode of payment wherever possible.
              </p>
              <p>
                Bank charges, payment gateway fees, and supplier deductions, if any, will apply.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Cancellation by Voya Trail</h2>
              <p>
                In the event of unavoidable circumstances such as natural calamities, government
                restrictions, operational issues, strikes, supplier failures, or other force majeure
                events, Voya Trail reserves the right to cancel any booking.
              </p>
              <p>In such cases, customers may be offered an alternative travel option or a refund subject to supplier policies.</p>
              <p>
                Voya Trail shall not be liable for any additional compensation beyond the refund or
                alternative arrangement as applicable.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Amendments and Date Changes</h2>
              <p>
                All amendments are subject to availability and the approval of the relevant supplier or
                service provider.
              </p>
              <p>
                Fare differences, amendment charges, rebooking costs, and related fees will apply.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Force Majeure</h2>
              <p>
                Voya Trail shall not be held responsible for delays, changes, disruptions, or cancellations
                caused by events beyond reasonable control, including natural disasters, pandemics, war,
                weather disruptions, transport interruptions, or government orders.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Disclaimer</h2>
              <p>
                Voya Trail acts solely as a travel service facilitator. Travel services are provided by
                third-party suppliers such as airlines, hotels, transport providers, local operators,
                insurers, and visa authorities. Accordingly, cancellations and refunds may ultimately
                remain subject to the terms and conditions of those third-party suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
