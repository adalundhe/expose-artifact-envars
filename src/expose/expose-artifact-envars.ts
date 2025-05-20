import * as core from '@actions/core'
import {getInputs} from './input-helper'
import fs from 'fs'
import path from 'path'

type Envars = {
  actions_results_url: string
  actions_runtime_token: string
}

const pathExistsAsync = async (path: string): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve, reject) => {
    try {
      resolve(fs.existsSync(path))
    } catch (err) {
      reject(err)
    }
  })

  return await promise
}

const createOutputFile = async (filepath: string, envars: Envars) => {
  const outputFile = path.basename(filepath)
  const directory = filepath.replace(outputFile, '')

  const directoryExists = await pathExistsAsync(directory)
  core.info(`Directory exists? - ${directoryExists}`)

  if (!directoryExists) {
    core.info(`Creating directory at - ${directory}`)
    await fs.promises.mkdir(directory, {recursive: true})
  }

  core.info(`Writing envars to path ${filepath}`)
  await fs.promises.writeFile(filepath, JSON.stringify(envars))
}

export async function run(): Promise<void> {
  const inputs = getInputs()

  const baseUrl = process.env['ACTIONS_RESULTS_URL']
  core.info(`Using the Artifact Results URL ${baseUrl}`)

  if (baseUrl === undefined) {
    throw new Error('ACTIONS_RESULTS_URL is empty')
  }

  const runtimeToken = process.env['ACTIONS_RUNTIME_TOKEN']
  core.info(`Using the Artifact Results URL ${baseUrl}`)

  if (runtimeToken === undefined) {
    throw new Error('ACTIONS_RUNTIME_TOKEN is empty')
  }

  await createOutputFile(inputs.outputPath, {
    actions_results_url: new URL(baseUrl).origin,
    actions_runtime_token: runtimeToken
  })
}
