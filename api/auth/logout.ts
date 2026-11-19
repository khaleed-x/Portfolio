import { cookie } from '../_lib/session'

export async function POST() {
  return new Response(null, { status: 204, headers: { 'Set-Cookie': cookie('admin', '', 0) } })
}
