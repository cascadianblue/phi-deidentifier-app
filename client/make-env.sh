#!/bin/bash
# This script injects runtime environmental variables into the PHI Deidentifier React app.
# Default values for variables are defined in `env_vars`; only variables that are defined in `env_vars` will be passed
# on to the React app.

# Recreate config file
rm -rf ./env.js
touch ./env.js

# Add assignment operator
echo "window._env_ = {" >>./env.js

# Read each var name in env_vars file
while read -r varname || [[ -n "$varname" ]]; do
  # Read value of current variable from environment
  value=$(printf '%s\n' "${!varname}")

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >>./env.js
done < env_vars

echo "}" >>./env.js
