import { useState } from "react";
import Logo from "./logo/logo";

function Footer({ data }) {

	const [project, setProject] = useState([
    {
      name: "FitPanda",
      url: "https://fitpanda-1.onrender.com",
    },
    {
      name: "AgroTech",
      url: "https://agrotech-1.onrender.com/reel/reels",
    },
    {
      name: "ESP32 Controller",
      url: "https://esp-32-0.onrender.com",
    },
  ]);


	const [company, setCompany] = useState(['About', 'Contact us'])

  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 to-slate-800 border-t border-gray-200 pt-4">
		<div className="p-5 font-bold">
			<h1 className="text-2xl text-white">Show Projects</h1>
		</div>
      <div className="max-w-7xl mx-auto flex sm:flex-col md:flex-row flex-col">

        <div className="grid grid-cols-2 md:grid md:grid-cols-3 gap-8 mb-10 px-4 sm:px-6">
          
          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">My Projects</h3>
            <ul className="space-y-3">
            {project.map((i,index) => (
              <li key={index}>
                <a 
                href={i.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-200 hover:text-blue-600 transition-colors group"
                >
                <svg className="w-5 h-5 mr-2 text-gray-100 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span className="text-sm">{i.name}</span>
                </a>
              </li>
            ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-bold">Company</h1>
            <div className="text-sm">
            {company.map((i, index) => (
              <div key={index}>
                <p className="cursor-pointer">{i}</p>
              </div>
            ))}
            </div>
                </div>
          </div>

		    <div className="sm:grid ms:grid flex flex-row sm:grid-cols-2 md:grid-cols-2 gap-8 mb-10 px-4 sm:px-6">
          

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Contact Me</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <svg className="shrink-0 w-5 h-5 mt-1 mr-3 text-blue-400 overflow-y-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p className="font-medium text-gray-100">Email</p>
                  <a href={data.email} className="text-gray-400 hover:text-blue-400 transition-colors">apratapsingh151@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-1 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p className="font-medium text-gray-100">Phone</p>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors">+91-xxxxxxx125</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-1 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p className="font-medium text-gray-100">Location</p>
                  <p className="text-gray-400">Mathura (UP), India</p>
                </div>
              </li>
            </ul>
          </div>

		
		  {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Social Media</h3>
            <div className="flex sm:flex-wrap md:flex-wrap flex-wrap w-fit gap-2">
              <a href="https://github.com/aryan151pratap" target="_blank" className="text-gray-100 hover:text-zinc-900 transition-colors p-2 bg-zinc-900 hover:bg-white rounded-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/aryan-pratap-singh-105059290/" target="_blank" className="text-gray-100 hover:text-blue-600 transition-colors p-2 bg-blue-800 hover:bg-white rounded-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" target="_blank" className="text-gray-100 hover:text-red-800 transition-colors p-2 bg-indigo-400 hover:bg-white rounded-sm bg-linear-40 from-orange-500 from-1% via-red-500 via-30% to-indigo-500 to-90%">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100071114514382" target="_blank" className="text-gray-100 hover:text-blue-400 transition-colors p-2 bg-blue-400 hover:bg-white rounded-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .733.593 1.326 1.325 1.326h11.49v-9.835H9.692V10.41h3.123V8.076c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24h-1.918c-1.505 0-1.796.716-1.796 1.766v2.317h3.59l-.467 3.751h-3.123V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.405 0 22.675 0z"/>
              </svg>
            </a>
            </div>
			      <p className="font-bold text-zinc-400">Get exclusive resource</p>
          </div>
          
        </div>
        
      </div>
        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-col justify-between">
          <p className="text-gray-400 text-sm p-5">
            © {new Date().getFullYear()} Show Projects. All rights reserved.
          </p>
          <div className="w-full mt-4 md:mt-0 bg-zinc-700/50 p-5">
            <ul className="flex space-x-6 text-sm flex justify-end">
              <li><a href="#" className="text-gray-100 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-100 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-100 hover:text-blue-400 transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
    </footer>
  );
}

export default Footer;