module.exports = {
  mode: 'jit',
  // purge - 프로덕션으로 build 할 때, 사용되지 않는 모든 클래스를 제거하여
  // 파일 사이즈를 최적화 시켜준다.
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Spoqa Han Sans Neo', 'sans-serif'],
      serif: ['Spoqa Han Sans Neo', 'serif'],
      body: ['Spoqa Han Sans Neo', 'sans-serif'],
    },
    extend: {
      backgroundImage: () => ({
        'login-background':
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1280.jpg')",
        'landing-background':
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-gif.gif')",
        'profile-background':
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1080.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
