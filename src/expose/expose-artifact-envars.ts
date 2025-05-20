import * as core from '@actions/core'
import {getInputs} from './input-helper'
import fs from 'fs'

export async function run(): Promise<void> {
  const inputs = getInputs()

  const baseUrl = process.env['ACTIONS_RESULTS_URL']
  core.info(`Using the Artifact Results URL ${baseUrl}`)

  if (baseUrl === undefined) {
    throw new Error('ACTIONS_RESULTS_URL is empty')
  }

  const runtimeToken = process.env['ACTIONS_RUNTIME_TOKEN']
  core.info(`Using the Artifact Results URL ${baseUrl}`)

  const actionsEnvars = {
    actions_results_url: new URL(baseUrl).origin,
    actions_runtime_token: runtimeToken
  }

  await fs.promises.writeFile(inputs.outputPath, JSON.stringify(actionsEnvars))
}
