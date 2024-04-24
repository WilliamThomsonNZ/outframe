import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'heroCarousel',
      title: 'Hero Carousel',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description:
                "Describe what's in the image for screen readers and search engines.",
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'heroTestimonial',
      title: 'Hero Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'logoCloud',
      title: 'Logo Cloud',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alternative Text',
              description:
                "Describe what's in the image for screen readers and search engines.",
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies Grid',
      type: 'array',
      description: 'Select the case studies to display on the homepage.',
      of: [
        {
          name: 'caseStudy',
          title: 'Case Study',
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
        {
          name: 'testimonial',
          title: 'Testimonial',
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Select the testimonials to display on the homepage.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
  ],
})