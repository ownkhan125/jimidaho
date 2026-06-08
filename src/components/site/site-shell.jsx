import PropTypes from 'prop-types'

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

SiteShell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteShell
