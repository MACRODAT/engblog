import React from "react";

export default function Footer() {
	return (
	  <footer className="bg-gray-100 text-gray-600 text-sm">
		{/* Top Section */}
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-300">
		  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">Shop and Learn</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Store</a></li>
				<li><a href="#" className="hover:underline">Mac</a></li>
				<li><a href="#" className="hover:underline">iPad</a></li>
				<li><a href="#" className="hover:underline">iPhone</a></li>
				<li><a href="#" className="hover:underline">Watch</a></li>
				<li><a href="#" className="hover:underline">AirPods</a></li>
			  </ul>
			</div>
  
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Apple Music</a></li>
				<li><a href="#" className="hover:underline">Apple TV+</a></li>
				<li><a href="#" className="hover:underline">iCloud</a></li>
				<li><a href="#" className="hover:underline">Apple Books</a></li>
			  </ul>
			</div>
  
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">Apple Store</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Find a Store</a></li>
				<li><a href="#" className="hover:underline">Genius Bar</a></li>
				<li><a href="#" className="hover:underline">Today at Apple</a></li>
				<li><a href="#" className="hover:underline">Apple Camp</a></li>
			  </ul>
			</div>
  
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">For Business</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Apple and Business</a></li>
				<li><a href="#" className="hover:underline">Shop for Business</a></li>
			  </ul>
			</div>
  
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">For Education</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Apple and Education</a></li>
				<li><a href="#" className="hover:underline">Shop for Education</a></li>
				<li><a href="#" className="hover:underline">College Students</a></li>
			  </ul>
			</div>
  
			<div>
			  <h3 className="font-semibold text-gray-900 mb-4">Apple Values</h3>
			  <ul className="space-y-2">
				<li><a href="#" className="hover:underline">Accessibility</a></li>
				<li><a href="#" className="hover:underline">Environment</a></li>
				<li><a href="#" className="hover:underline">Privacy</a></li>
			  </ul>
			</div>
		  </div>
		</div>
  
		{/* Bottom Section */}
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
		  <p className="text-center text-xs text-gray-500">
			© 2025 Apple Inc. All rights reserved. | <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Use</a>
		  </p>
		</div>
	  </footer>
	);
  }
  