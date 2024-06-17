import itertools

states = ["0", "1", "2"]
initialState = "0"
programFunction = ["0a0", "0a1", "0b0", "1a2", "2a2", "2b2"]
finalStates = ["2"]
alphabet = ["a", "b"]

nfa_transactions = {}
dfa_transactions = {}

def splitString(transition):
    res = []
    current = ""
    for i in transition:
        if i.isalpha():
            res.append(current)
            res.append(i)
            current = ""
        else:
            current += i

    res.append(current)
    return res


for transition in programFunction:
    t = splitString(transition)
    if (t[0], t[1]) in nfa_transactions:
        nfa_transactions[(t[0], t[1])].append(t[2])
    else:
        nfa_transactions[(t[0], t[1])] = [t[2]]
    


all_combinations = []

for r in range(1, len(states) + 1):
    
    combinations = itertools.combinations(states, r)
    for combo in combinations:
        all_combinations.append('-'.join(combo))



all_combinations = sorted(all_combinations)


for state in all_combinations:
    for letter in alphabet:
        dfa_transactions[(state, letter)] = []

for state in dfa_transactions:
    s = state[0].split('-')
    for i in s:
        if (i, state[1]) in nfa_transactions:
            for j in nfa_transactions[(i, state[1])]:
                if j not in dfa_transactions[state]:
                    dfa_transactions[state].append(j)


visited = []
def dfs(vertice):
    if vertice not in visited:
        visited.append(vertice)
    else:
        return
    s = '-'.join(dfa_transactions[vertice])
    for letra in alphabet:
        dfs((s, letra))

for letra in alphabet:
    dfs((initialState, letra))


    
filtered_transitions = {k: v for k, v in dfa_transactions.items() if k in visited}
dfa_transactions = filtered_transitions
keys_to_remove = []

for state in dfa_transactions:
    if len(dfa_transactions[state]) == 0:
        isFinal = False
        s = state[0].split('-')
        for i in s:
            if i in finalStates:
                isFinal = True
                break
        if not isFinal:
            keys_to_remove.append(state)


for key in keys_to_remove:
    dfa_transactions.pop(key)


for state in dfa_transactions:
    s = '-'.join(dfa_transactions[state])
    dfa_transactions[state] = s


print(dfa_transactions)



