<template>
    <footer class="bg-white py-4 border-gray-200">
        <div class="w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <!-- <div class="grid grid-cols-1 md:grid-cols-4 "> -->
            <div class="flex gap-16">
                <!-- Modak Links -->
                <div>
                    <h3 class="text-[12px] text-gray-900">MODAK</h3>
                    <ul class="space-y-2 text-xs">
                        <h5 class="text-[16px] text-sky-900 font-bold">Products</h5>
                        <li><a href="#" class="text-gray-600 font-sans  text-xs ">Modak Nabu™</a></li>
                    </ul>
                    <div class=" flex items-center mt-32">
                        <i class="pi pi-envelope mr-1 bg-blue-300 text-[10px]"></i>
                        <a href="mailto:sales@modak.com" class="text-xs text-blue-600 hover:underline">sales@modak.com</a>
                    </div>
                </div>

                <!-- Solutions Links -->
                <div>
                    <h3 class="text-[12px] text-gray-900">MODAK</h3>
                    <ul class="text-xs font-sans space-y-1">
                        <h5 class="text-[16px] text-sky-900 font-bold">Solutions</h5>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Managed DataOps</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Governed Data Lake</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Metaprogramming</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Managed Services</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Data Migration</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Data Fingerprinting</a></li>
                    </ul>
                </div>

                <!-- Our Links -->
                <div>
                    <h3 class="text-[12px] text-gray-900">OUR</h3>
                    <ul class="text-xs font-sans space-y-1">
                        <h5 class="text-[16px] text-sky-900 font-bold">Company</h5>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Team</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Work Culture</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Where to Find Us -->
                <div>
                    <p class="text-[12px] text-gray-900">OUR LOCATIONS</p>
                    <div>
                        <h5 class="text-[16px] text-sky-900 font-bold">Where to find us</h5>
                        <!-- Map and Locations Side by Side -->
                        <div class="flex flex-col md:flex-row gap-4 mt-2">
                            <!-- Map Image -->
                            <div class="flex-shrink-0">
                                <img src="@/assets/map.svg" alt="World Map" class="w-[200px] h-auto" />
                            </div>
                            <!-- Locations -->
                            <div class=" font-sans flex-grow">
                                <ul class="text-[12px] text-gray-600">
                                    <li class="flex items-center">
                                        <i class="pi pi-map-marker text-blue-300 text-xs mr-2"></i>
                                        <span>USA: 21660 W Field Parkway, Deer Park, IL - 60010</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-map-marker text-blue-300 text-xs mr-2"></i>
                                        <span>USA: 312 S 4th St, Suite 700, Louisville, KY 40202</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-map-marker text-blue-300 text-xs mr-2"></i>
                                        <span>UAE: Dubai Silicon Oasis, (DSO), 341041</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-map-marker text-blue-300 text-xs mr-2"></i>
                                        <span>India: 6th Floor, Element #337, Financial District, Nanakramguda, Telangana 500032</span>
                                    </li>
                                </ul>
                                <!-- Social Media Icons -->
                                <div class="flex space-x-4 mt-4">
                                    <a href="#" class="text-blue-600 hover:text-blue-800"><i class="pi pi-facebook text-xl"></i></a>
                                    <a href="#" class="text-blue-600 hover:text-blue-800"><i class="pi pi-twitter text-xl"></i></a>
                                    <a href="#" class="text-red-600 hover:text-red-800"><i class="pi pi-youtube text-xl"></i></a>
                                    <a href="#" class="text-blue-600 hover:text-blue-800"><i class="pi pi-linkedin text-xl"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-2 border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center">
                <div class="text-gray-600 text-sm">
                    <p>©2022 Modak Analytics. An ISO 9001 & 27001 company. All Rights Reserved.</p>
                </div>
                <div class="flex space-x-4 text-gray-600 text-sm">
                    <a href="#" class="hover:text-blue-600">TERMS OF USE</a>
                    <a href="#" class="hover:text-blue-600">PRIVACY POLICY</a>
                    <a href="#" class="hover:text-blue-600">DISCLAIMER</a>
                    <a href="#" class="hover:text-blue-600">BACK TO TOP</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
</script>