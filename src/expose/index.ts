import * as core from '@actions/core'
import {run} from './expose-artifact-envars'

run().catch(error => {
  core.setFailed((error as Error).message)
})
