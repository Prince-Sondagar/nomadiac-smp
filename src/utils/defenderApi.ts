import { v4 as uuid } from 'uuid';

export interface DefenderAPISurveyType {
  survey_number: number,
  duplicate_initial_ud: string,
  sn_ud: string,
  duplicate_potential: string,
  flag: number,
  destination: Object,
  duplicate_score: number,
  failure_reason: string,
  country_mismatch: number
}

export interface SearchDefenderAPIPayload {
  Surveys: DefenderAPISurveyType[]

  Respondent: {
    country_code: string,
    threat_potential: string,
    threat_potential_score: number,
    respondent_ud: string,
    respondent_risk: number,
    country: string
  },
  exec: string
}

type Args = {
  PanelistID: string | null;
}

export const defenderAPISearch = async ({ PanelistID }: Args): Promise<number | undefined> => {
  try {
    const response = await fetch(`https://prod.rtymgt.com/api/v4/respondents/search/a5d5fb63-dbfe-489c-9556-40d4d3506d1a?sn_ud=${uuid()}&sy_nr=${uuid()}&rt_sr_pd=${PanelistID}`)
    const data: SearchDefenderAPIPayload = await response.json();
    const { Respondent: { threat_potential_score = 0 } = {} } = data || {}
    return threat_potential_score;
  }
  catch (_error) { }
}