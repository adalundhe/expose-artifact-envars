import * as core from '@actions/core'
import {Inputs} from './constants'
import {ExposeArtifactEnvarInputs} from './expose-artifact-envar-inputs'

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): ExposeArtifactEnvarInputs {
  const path = core.getInput(Inputs.Path, {required: true})

  const inputs = {
    outputPath: path
  } as ExposeArtifactEnvarInputs

  return inputs
}
