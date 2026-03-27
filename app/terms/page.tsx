import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Voya Trail",
  description: "Read the Voya Trail terms of service.",
}

export default function TermsPage() {
  return (
    <main className="bg-white pt-40 text-slate-900 sm:pt-44">
      <section className="flex min-h-[36vh] items-center justify-center bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#8B0000] sm:text-5xl md:text-6xl">
            Terms of Service
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
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Introduction</h2>
              <p>
                These Terms and Conditions, together with our Privacy Policy and any other applicable
                policies or notices, form a binding agreement between Voya Trail, the website owner
                (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), and you (&quot;you&quot; or &quot;your&quot;) in relation to your use of our
                website, travel-related offerings, and associated services (collectively, the
                &quot;Services&quot;).
              </p>
              <p>
                By using our website or availing of any Services, you acknowledge that you have read,
                understood, and accepted these Terms. We may update or modify these Terms at any time
                without prior notice, and it is your responsibility to review them periodically to remain
                informed of any changes.
              </p>
              <p>
                Use of this website and our Services is subject at all times to the terms stated below.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Registration and Account Use</h2>
              <p>
                To access certain premium or personalized Services, you may be required to register an
                account with us. You agree to provide information that is true, accurate, current, and
                complete during registration and at all times thereafter.
              </p>
              <p>
                You are solely responsible for maintaining the confidentiality of your account credentials
                and for all activities carried out under your registered account. If you become aware of
                any unauthorized access or use, you must notify our support team immediately.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Warranties and Accuracy</h2>
              <p>
                Neither Voya Trail nor any third party makes any warranty or guarantee regarding the
                accuracy, timeliness, performance, completeness, or suitability of the information,
                materials, or Services made available through this website for any particular purpose.
              </p>
              <p>
                You acknowledge that the website and Services may contain inaccuracies or errors, and we
                expressly exclude liability for such inaccuracies or errors to the fullest extent
                permitted by law. Your use of the website and Services is entirely at your own risk and
                discretion.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Intellectual Property</h2>
              <p>
                All content, design, text, graphics, branding, materials, and other elements made
                available through this website and our Services are proprietary to Voya Trail or are used
                under valid license. You may not claim any ownership, title, or intellectual property
                rights in any part of the website or Services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Unauthorized Use</h2>
              <p>
                Unauthorized use of the website or Services may give rise to legal action under these
                Terms and under applicable laws. This includes misuse of content, interference with the
                website, unauthorized access attempts, or any unlawful use of our systems or Services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[24px] font-bold text-[#8B0000] md:text-[36px]">Legal and Jurisdiction</h2>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#8B0000] md:text-xl">Force Majeure</h2>
              <p>
                Notwithstanding anything contained in these Terms, neither party shall be liable for any
                failure or delay in performing its obligations where such failure or delay results from a
                force majeure event beyond reasonable control.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#8B0000] md:text-xl">Governing Law</h2>
              <p>
                These Terms and any dispute or claim arising out of or relating to them, including their
                enforceability, shall be governed by and construed in accordance with the laws of India.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#8B0000] md:text-xl">Jurisdiction</h2>
              <p>
                All disputes arising out of or in connection with these Terms shall be subject to the
                exclusive jurisdiction of the competent courts located in Dehradun, Uttarakhand, India.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#8B0000] md:text-xl">Contact Us</h2>
              <p>
                All concerns, notices, or communications relating to these Terms should be sent to Voya
                Trail using the contact information provided on this website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
