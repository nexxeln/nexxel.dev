#!/bin/bash

read -p "Enter file name: " filename
filepath="src/content/blog/$filename"

content=$(cat <<EOF
---
title: ""
description: ""
date: ""
---

import Link from "../../components/Link.vue"
import Code from "../../components/Code.vue"

export const components = { a: Link, code: Code }
EOF
)

echo "$content" > "$filepath"

echo "File created successfully at $filepath"
