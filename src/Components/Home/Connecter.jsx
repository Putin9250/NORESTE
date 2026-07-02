import { div } from 'framer-motion/client'
import React from 'react'
import Who from '../Who/Who';
import ResearchDomain from '../ResearchDomain/ResearchDomain';
import Difference from '../Difference/Difference';

const connecter = () => {
  return (
    <div>
      <Who />
      <ResearchDomain />
      <Difference />
    </div>
  )
}

export default connecter;