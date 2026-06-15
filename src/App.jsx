import PricingEstimator from './pages/PricingEstimator'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-16">
      <Header />
      <main>
        <PricingEstimator />
      </main>
      <Footer />
    </div>
  )
}

export default App
