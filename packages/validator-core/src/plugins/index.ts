// This export files also will get build individually for the client side
// and same thing could apply for the developer add rules

// Here we only provide a list of files and dynamicly import it

import between from './between'
import email from './email'
import int from './int'
import lessThanEqual from './less-than-equal'
import lessThan from './less-than'
import moreThanEqual from './more-than-equal'
import moreThan from './more-than'
import unit from './uint'
import within from './within'

export const plugins = [
  between,
  email,
  int,
  lessThanEqual,
  lessThan,
  moreThanEqual,
  moreThan,
  unit,
  within,
]
