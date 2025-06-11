<template>
     <header class="relative   bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg top-0 z-50">
      <div class=" px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="relative bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-full">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            <div class="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              LifeDonor+
            </div>
          </div>
          
          <nav class="hidden md:flex items-center space-x-6">
            <RouterLink to="/welcome-page" class="group relative px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
              <span class="relative z-10 flex items-center space-x-2">
                <span>🏠</span>
                <span class="font-medium">Home</span>
              </span>
              <div class="absolute inset-0 bg-red-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
            </RouterLink>
            <a href="#" class="group relative px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
              <span class="relative z-10 flex items-center space-x-2">
                <span>📋</span>
                <span class="font-medium">Services</span>
              </span>
              <div class="absolute inset-0 bg-red-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
            </a>
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
              <div class="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <span class="flex items-center space-x-2">
                  <span>📞</span>
                  <span>Emergency: 15366</span>
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>

</template>