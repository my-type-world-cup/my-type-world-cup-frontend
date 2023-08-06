/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			}
		},
		fontFamily: {
			pretendard: ["Pretendard", "sans-serif"]
		},
		colors: {
			inherit: "inherit", //부모 요소 상속
			transparent: "transparent", // 투명
			current: "currentColor", //글자색 그대로사용
			black: "#000000",
			white: "#FFFFFF",
			main: "#7ED0FF",
			gray: "#9A9A9A",
			lightBlue: "#D7EEFB",
			blue: "#1a0dab",
			orange: "#F5541F",
			green: "#0F770D",
			hover: "#E9F4FF",
			sweetBlack: "#1A1A1A",
			inputGray: "#F5F5F5",
			inputHover: "#4AA0D5",
			hr: "#E5E5E5",
			warning: "#117FFA",
			error: "#FF0000",
			skeleton: "#f2f2f2"
		}
	},
	mode: "jit",
	plugins: []
};
