const RegEx = {
    alphabetSpace: /^(?!\s*$)[a-zA-Z.+\s'-]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    phone: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
    password: RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$^&*_-]).{8,}$'),
}

export default RegEx;