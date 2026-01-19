/**
 * Demo Content Seed Script
 * Populates the database with sample content for Advokat Petrovic law firm
 *
 * Run with: pnpm seed
 *
 * This script is idempotent - it checks for existing content before creating
 */

import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  console.log('Starting seed process...')

  const payload = await getPayload({ config })

  // ============================================
  // 1. Seed Site Settings (Global)
  // ============================================
  console.log('Seeding Site Settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      firmName: 'Advokat Petrovic',
      tagline: 'Vaš pouzdani pravni partner',
      contactEmail: 'office@advokatpetrovic.rs',
      contactPhone: '+381 11 123 4567',
      address: 'Kneza Mihaila 42\n11000 Beograd\nSrbija',
      workingHours:
        'Ponedeljak - Petak: 09:00 - 17:00\nSubota: Po dogovoru\nNedelja: Zatvoreno',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/company/advokat-petrovic' },
        { platform: 'facebook', url: 'https://facebook.com/advokatpetrovic' },
      ],
    },
  })
  console.log('Site Settings seeded.')

  // ============================================
  // 2. Seed Services
  // ============================================
  console.log('Seeding Services...')

  const servicesData = [
    {
      title: 'Gradjansko pravo',
      slug: 'gradjansko-pravo',
      description:
        'Pruzamo sveobuhvatne usluge iz oblasti gradjanskog prava, ukljucujuci ugovorne sporove, naknadu stete, zastitu potrosaca i ostale gradjanske predmete. Nas tim ima bogato iskustvo u zastupanju klijenata pred sudovima svih instanci.',
      icon: 'scale',
      order: 1,
    },
    {
      title: 'Krivicno pravo',
      slug: 'krivicno-pravo',
      description:
        'Specijalizovani smo za odbranu u krivicnim postupcima, od privrednog kriminala do najtezih krivicnih dela. Pruzamo strucnu pravnu pomoc u svim fazama postupka - od istrage do izvrsenja presude.',
      icon: 'shield',
      order: 2,
    },
    {
      title: 'Privredno pravo',
      slug: 'privredno-pravo',
      description:
        'Savetujemo domace i strane klijente u vezi sa osnivanjem preduzeca, korporativnim restrukturiranjem, spajanjima i akvizicijama, kao i u svim aspektima poslovnih ugovora i privrednih sporova.',
      icon: 'briefcase',
      order: 3,
    },
    {
      title: 'Radno pravo',
      slug: 'radno-pravo',
      description:
        'Pruzamo pravnu pomoc poslodavcima i zaposlenima u svim pitanjima radnog odnosa - od zakljucivanja ugovora o radu, preko disciplinskih postupaka, do zastupanja u radnim sporovima.',
      icon: 'users',
      order: 4,
    },
    {
      title: 'Porodicno pravo',
      slug: 'porodicno-pravo',
      description:
        'Zastupamo klijente u porodicnim sporovima ukljucujuci razvod braka, podelu imovine, starateljstvo nad decom i alimentaciju. Pristupamo svakom slucaju sa pažnjom i diskrecijom.',
      icon: 'heart',
      order: 5,
    },
    {
      title: 'Nepokretnosti',
      slug: 'nepokretnosti',
      description:
        'Savetujemo u vezi sa kupoprodajom nekretnina, proveru pravnog statusa, uknjižbu, hipoteke i sve ostale pravne aspekte prometa i upravljanja nepokretnostima u Srbiji.',
      icon: 'home',
      order: 6,
    },
  ]

  for (const service of servicesData) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'services',
        data: service,
      })
      console.log(`  Created service: ${service.title}`)
    } else {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: service,
      })
      console.log(`  Updated service: ${service.title}`)
    }
  }
  console.log('Services seeded.')

  // ============================================
  // 3. Seed Team Members
  // ============================================
  console.log('Seeding Team Members...')

  const teamData = [
    {
      name: 'Marko Petrovic',
      role: 'Osnivac i glavni advokat',
      bio: 'Advokat Marko Petrovic je osnivač kancelarije sa preko 25 godina iskustva u pravnoj praksi. Diplomirao je na Pravnom fakultetu Univerziteta u Beogradu 1998. godine. Specijalizovan je za privredno i korporativno pravo, sa posebnim fokusom na medjunarodne transakcije.',
      order: 1,
    },
    {
      name: 'Jelena Nikolic',
      role: 'Stariji advokat',
      bio: 'Jelena Nikolic je stariji advokat u kancelariji sa 15 godina iskustva. Specijalizovana je za porodicno pravo i radne sporove. Poznata je po strucnom i empaticnom pristupu klijentima u osetljivim pravnim situacijama.',
      order: 2,
    },
    {
      name: 'Stefan Jovanovic',
      role: 'Advokat',
      bio: 'Stefan Jovanovic je advokat koji se pridružio nasem timu 2018. godine. Bavi se gradjanskim pravom i pravom nepokretnosti. Master studije zavrsio je na temu zastite prava svojine u srpskom pravnom sistemu.',
      order: 3,
    },
  ]

  for (const member of teamData) {
    const existing = await payload.find({
      collection: 'team',
      where: { name: { equals: member.name } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'team',
        data: member,
      })
      console.log(`  Created team member: ${member.name}`)
    } else {
      await payload.update({
        collection: 'team',
        id: existing.docs[0].id,
        data: member,
      })
      console.log(`  Updated team member: ${member.name}`)
    }
  }
  console.log('Team Members seeded.')

  // ============================================
  // 4. Seed Testimonials
  // ============================================
  console.log('Seeding Testimonials...')

  const testimonialsData = [
    {
      clientName: 'Dragana M.',
      clientRole: 'Direktor, IT kompanija',
      content:
        'Advokat Petrovic nam je pomogao u kompleksnom procesu restrukturiranja nase kompanije. Njihov profesionalizam i znanje iz oblasti privrednog prava su izuzetni. Preporucujem ih svima koji traže pouzdanog pravnog partnera.',
      rating: 5,
      order: 1,
    },
    {
      clientName: 'Nenad S.',
      clientRole: 'Vlasnik restorana',
      content:
        'Kada sam imao problem sa ugovorom o zakupu, advokat Jelena Nikolic mi je pruzila brzu i efikasnu pravnu pomoc. Uspeli smo da resimo spor na obostrano zadovoljstvo. Zahvalan sam na njihovom angazovanju.',
      rating: 5,
      order: 2,
    },
    {
      clientName: 'Milica P.',
      clientRole: 'Privatni klijent',
      content:
        'Prosla sam kroz tezak razvod i kancelarija Advokat Petrovic mi je pruzila izuzetnu podrsku. Bili su profesionalni, diskretni i uvek dostupni kada mi je trebala pomoc. Posebno zahvaljujem advokatu Jeleni na strpljenju.',
      rating: 5,
      order: 3,
    },
  ]

  for (const testimonial of testimonialsData) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { clientName: { equals: testimonial.clientName } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'testimonials',
        data: testimonial,
      })
      console.log(`  Created testimonial: ${testimonial.clientName}`)
    } else {
      await payload.update({
        collection: 'testimonials',
        id: existing.docs[0].id,
        data: testimonial,
      })
      console.log(`  Updated testimonial: ${testimonial.clientName}`)
    }
  }
  console.log('Testimonials seeded.')

  // ============================================
  // 5. Seed Blog Posts
  // ============================================
  console.log('Seeding Blog Posts...')

  const blogPostsData = [
    {
      title: 'Novi Zakon o radu - Sta donosi izmene iz 2024?',
      slug: 'novi-zakon-o-radu-2024',
      excerpt:
        'Pregled najvaznijih izmena Zakona o radu koje stupaju na snagu u 2024. godini i kako ce uticati na prava i obaveze zaposlenih i poslodavaca.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Narodna skupstina Republike Srbije usvojila je izmene Zakona o radu koje donose znacajne novine u oblasti radnih odnosa. U ovom clanku analiziramo kljucne promene.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Kljucne izmene' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Nove odredbe ukljucuju prosirena prava zaposlenih u pogledu rada od kuce, detaljnije regulisanje prekovremenog rada, kao i poboljsanja u oblasti zastite od zlostavljanja na radnom mestu.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Uticaj na poslodavce' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Poslodavci ce morati da prilagode interne pravilnike i ugovore o radu novim zakonskim zahtevima. Preporucujemo konsultacije sa pravnim strucnjacima kako bi se osigurala usaglasenost.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      },
      author: 'Marko Petrovic',
      publishedDate: '2024-01-15',
    },
    {
      title: 'Zastita potrosaca - Vasa prava pri kupovini online',
      slug: 'zastita-potrosaca-online-kupovina',
      excerpt:
        'Saznajte koja prava imate kao potrosac prilikom kupovine putem interneta u Srbiji i kako da ih ostvarite u slucaju problema.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Sa rastom e-trgovine u Srbiji, sve je vise potrosaca koji se susrecu sa problemima prilikom online kupovine. Zakon o zastiti potrosaca pruzа znacajnu zastitu, ali mnogi gradjani nisu u potpunosti upoznati sa svojim pravima.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Pravo na odustanak' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Pri kupovini na daljinu, imate pravo da odustanete od ugovora u roku od 14 dana bez navodjenja razloga. Ovo pravo se primenjuje na vecinu proizvoda kupljenih online.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Reklamacije i povracaj novca' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Ukoliko proizvod ima nedostatak, imate pravo na popravku, zamenu, snizenje cene ili povracaj novca. Prodavac je duzan da odgovori na reklamaciju u roku od 8 dana.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      },
      author: 'Stefan Jovanovic',
      publishedDate: '2024-02-20',
    },
  ]

  for (const post of blogPostsData) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'blog-posts',
        data: post,
      })
      console.log(`  Created blog post: ${post.title}`)
    } else {
      await payload.update({
        collection: 'blog-posts',
        id: existing.docs[0].id,
        data: post,
      })
      console.log(`  Updated blog post: ${post.title}`)
    }
  }
  console.log('Blog Posts seeded.')

  // ============================================
  // 6. Seed Homepage
  // ============================================
  console.log('Seeding Homepage...')

  const homepageData = {
    title: 'Pocetna',
    slug: 'home',
    hero: {
      headline: 'Advokat Petrovic',
      subheadline:
        'Vise od 25 godina pruzamo pouzdane pravne usluge gradjanima i preduzecima u Srbiji. Nas tim iskusnih advokata je posvecen zastiti vasih interesa.',
      ctaText: 'Zakazite konsultaciju',
      ctaLink: '/contact',
    },
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Dobrodosli u advokatsku kancelariju Petrovic. Sa tradicijom dugom vise od dve decenije, nase iskustvo i posveceni pristup garantuju najbolje rezultate za nase klijente.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    },
  }

  const existingHomepage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existingHomepage.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: homepageData,
    })
    console.log('  Created Homepage')
  } else {
    await payload.update({
      collection: 'pages',
      id: existingHomepage.docs[0].id,
      data: homepageData,
    })
    console.log('  Updated Homepage')
  }
  console.log('Homepage seeded.')

  console.log('\nSeed completed successfully!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
