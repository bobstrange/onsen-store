import { APIGatewayProxyHandler } from 'aws-lambda'
import { OnsenProgramsService } from '../../services/onsen_programs.service'

const service = new OnsenProgramsService()

const syncProgramHandler: APIGatewayProxyHandler = async (event, _context) => {
  const name = event.pathParameters.name
  try {
    const program = await service.fetchProgram(name)
    return {
      statusCode: 200,
      body: JSON.stringify({ data: program }, null, 2),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: error.message }, null, 2),
    }
  }
}

export const handler = syncProgramHandler