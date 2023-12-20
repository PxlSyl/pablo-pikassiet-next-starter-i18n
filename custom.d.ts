import { MDXComponents as OriginalMDXComponents } from 'pliny/mdx-components'

interface CustomMDXComponents extends OriginalMDXComponents {
  a?: React.ComponentType<InternalLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>
  Image?: React.ComponentType<ImageProps>
  TOCInline?: React.ComponentType<TOCInlineProps>
  pre?: React.ComponentType<PreProps>
  BlogNewsletterForm?: React.ComponentType<BlogNewsletterFormProps>
  Button?: React.ComponentType<ButtonProps>
  Accordion?: React.ComponentType<AccordionProps>
  Video?: React.ComponentType<VideoProps>
  Tab?: React.ComponentType<TabProps>
  Tabs?: React.ComponentType<TabsProps>
  Notice?: React.ComponentType<NoticeProps>
  Youtube?: React.ComponentType<YoutubeProps>
  Audioplayer?: React.ComponentType<AudioplayerProps>
  // Add or override other properties as needed
}

// Extend the original type
declare module 'pliny/mdx-components' {
  export interface MDXComponents extends CustomMDXComponents {}
}
