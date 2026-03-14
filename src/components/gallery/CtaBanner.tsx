export function CtaBanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-4 px-4 shadow-lg">
      <div className="container-fluid flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">✨ Love this template?</h3>
          <p className="text-blue-100 text-sm">Get your own professional website free with LoanGraphs</p>
        </div>
        <a
          href="https://loangraphs.com/signup"
          className="px-8 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition whitespace-nowrap"
        >
          Claim Now
        </a>
      </div>
    </div>
  )
}
