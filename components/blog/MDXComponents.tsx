import { CustomMDXComponents } from 'custom'

import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Accordion from '../shortcodes/Accordion'
import Button from '../shortcodes/Button'
import Notice from '../shortcodes/Notice'
import Tab from '../shortcodes/Tab'
import Tabs from '../shortcodes/Tabs'
import Video from '../shortcodes/Video'
import Youtube from '../shortcodes/Youtube'
import Audioplayer from '../shortcodes/Audioplayer'

import Image from './Image'
import CustomLink from './Link'

export const components: CustomMDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  Button,
  Accordion,
  Video,
  Tab,
  Tabs,
  Notice,
  Youtube,
  Audioplayer,
}
