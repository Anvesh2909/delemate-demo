/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
    ]
  },

      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'miiohspdhkkxrxctczvo.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'unsplash.com',
            port: '',
            pathname: '**',
          },
        ],
      },

  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
}

module.exports = nextConfig