import { initializeApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { defineSecret, defineString } from 'firebase-functions/params'
import { onRequest } from 'firebase-functions/v2/https'
import { MongoClient } from 'mongodb'

if (getApps().length === 0) initializeApp()

const mongoUri = defineSecret('MONGODB_URI')
const adminEmail = defineString('ADMIN_EMAIL', { default: 'alamin51527@gmail.com' })
const allowedOrigins = [
  /^https:\/\/anisur-rahman-al-amin\.web\.app$/,
  /^https:\/\/anisur-rahman-al-amin\.firebaseapp\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
]

let mongoClientPromise

async function getPortfolioCollection() {
  if (!mongoClientPromise) {
    const client = new MongoClient(mongoUri.value(), {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
    })
    mongoClientPromise = client.connect().catch((error) => {
      mongoClientPromise = undefined
      throw error
    })
  }

  const client = await mongoClientPromise
  return client.db('Anisur-Rahman').collection('portfolio')
}

function isPortfolioContent(value) {
  return typeof value === 'object'
    && value !== null
    && typeof value.profile?.name === 'string'
    && Array.isArray(value.education)
    && Array.isArray(value.researchProjects)
    && Array.isArray(value.publications)
    && Array.isArray(value.experience)
    && Array.isArray(value.ventures)
    && Array.isArray(value.awards)
    && Array.isArray(value.certifications)
    && Array.isArray(value.activities)
    && Array.isArray(value.skills)
    && Array.isArray(value.references)
}

export const portfolioApi = onRequest(
  {
    region: 'asia-south1',
    cors: allowedOrigins,
    secrets: [mongoUri],
    maxInstances: 3,
  },
  async (request, response) => {
    response.set('Cache-Control', 'no-store')

    if (request.path !== '/api/portfolio') {
      response.status(404).json({ error: 'Not found' })
      return
    }

    try {
      const collection = await getPortfolioCollection()

      if (request.method === 'GET') {
        const record = await collection.findOne({ _id: 'published' }, { projection: { data: 1 } })
        if (!record?.data) {
          response.status(404).json({ error: 'Portfolio content is not initialized yet' })
          return
        }
        response.json({ data: record.data })
        return
      }

      if (request.method !== 'PUT') {
        response.set('Allow', 'GET, PUT, OPTIONS').status(405).json({ error: 'Method not allowed' })
        return
      }

      const authorization = request.get('authorization') ?? ''
      const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
      if (!token) {
        response.status(401).json({ error: 'Authentication required' })
        return
      }

      const identity = await getAuth().verifyIdToken(token)
      if (!identity.email_verified || identity.email?.toLowerCase() !== adminEmail.value().toLowerCase()) {
        response.status(403).json({ error: 'Admin access required' })
        return
      }

      if (!isPortfolioContent(request.body?.data)) {
        response.status(400).json({ error: 'Portfolio data is incomplete or invalid' })
        return
      }

      await collection.replaceOne(
        { _id: 'published' },
        { _id: 'published', data: request.body.data, updatedAt: new Date() },
        { upsert: true },
      )
      response.json({ ok: true, updatedAt: new Date().toISOString() })
    } catch (error) {
      console.error('Portfolio API request failed', error)
      response.status(500).json({ error: 'Portfolio service is temporarily unavailable' })
    }
  },
)
