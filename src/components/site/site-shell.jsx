import Header from '@/components/site/header'
import Footer from '@/components/site/footer'

const SiteShell = ({ children }) => {
  return (
    <>
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default SiteShell
