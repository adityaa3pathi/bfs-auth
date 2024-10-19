/** @type {import('next').NextConfig} */
const nextConfig = {


    webpack: (config) => {
           config.externals = [...config.externals, 'bcrypt'];
            return config;
          },
        
    images: {
        domains: [
            "utfs.io",
            "res.cloudinary.com" 
        ],
        // hostname: [
        //     "res.cloudinary.com"
        // ]
    }
};



export default nextConfig;
 