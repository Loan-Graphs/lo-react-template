const API_BASE = 'https://api.loangraphs.com/api'

export async function registerLO(payload: {
  name: string
  email: string
  password: string
  nmls: string
  phone: string
  licensed_states: string[]
}): Promise<{ token: string; user: { id: number; email: string; name: string } }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      password: payload.password,
      confirm_password: payload.password,
      user_type: 'loan_officer',
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || `registerLO failed: ${res.status}`)
  }

  return res.json()
}

export async function createLandingPage(token: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/user/website/landing-page/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return { ok: res.ok }
}

export async function setLandingPage(
  token: string,
  payload: {
    subdomain: string
    template_id: number
    primary_color?: string
    secondary_color?: string
  }
): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/user/website/landing-page`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return { ok: res.ok }
}

export async function setBasicInfo(
  token: string,
  payload: {
    nmls: string
    phone_number: string
    licensed_states: string[]
  }
): Promise<{ ok: boolean }> {
  const formData = new FormData()
  formData.append('nmls', payload.nmls)
  formData.append('phone_number', payload.phone_number)
  for (const state of payload.licensed_states) {
    formData.append('licensed_states[]', state)
  }

  const res = await fetch(`${API_BASE}/settings/basic-information`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  return { ok: res.ok }
}
