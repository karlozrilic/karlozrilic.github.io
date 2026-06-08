export type VercelProject = {
    accountId: string;
    autoAssignCustomDomains: boolean;
    autoAssignCustomDomainsUpdatedBy: string;
    autoExposeSystemEnvs: boolean;
    buildCommand?: unknown;
    createdAt: EpochTimeStamp;
    crons: {
        definitions: unknown[];
        deploymentId: string;
        disabledAt?: unknown;
        enabledAt: EpochTimeStamp;
        updatedAt: EpochTimeStamp;
    };
    defaultResourceConfig: {
        elasticConcurrencyEnabled: boolean;
        fluid: boolean;
        functionDefaultMemoryType: string;
        functionDefaultRegions: string[];
        functionDefaultTimeout: number;
        functionZeroConfigFailover: boolean;
    };
    deploymentExpiration: {
        deploymentsToKeep: number;
        expirationDays: number;
        expirationDaysCanceled: number;
        expirationDaysErrored: number;
        expirationDaysProduction: number;
    };
    devCommand?: unknown;
    directoryListing: boolean;
    enableExternalRewriteCaching: boolean;
    enablePreviewFeedback?: unknown;
    enableProductionFeedback: boolean;
    env: {
        comment: string;
        configurationId?: unknown;
        createdAt: EpochTimeStamp;
        createdBy: string;
        customEnvironmentIds: unknown[];
        id: string;
        key: string;
        target: string[];
        type: string;
        updatedAt: EpochTimeStamp;
        updatedBy?: string;
        value: string;
    }[];
    features: {
        webAnalytics?: boolean;
    };
    framework?: unknown;
    gitComments: {
        onCommit: boolean;
        onPullRequest: boolean;
    };
    gitForkProtection: boolean;
    gitLFS: boolean;
    gitProviderOptions: {
        createDeployments: string;
    };
    hasDeployments: boolean;
    id: string;
    installCommand?: unknown;
    lastAliasRequest?: unknown;
    lastRollbackTarget?: unknown;
    latestDeployments: {
        alias: string[];
        aliasAssigned: EpochTimeStamp;
        aliasError?: unknown;
        automaticAliases: string[];
        buildingAt: EpochTimeStamp;
        createdIn: string;
        creator: VercelProjectCreator;
        deploymentHostname: string;
        forced: boolean;
        id: string;
        meta: VercelProjectMeta;
        name: string;
        oidcTokenClaims: VercelOidcTokenClaims;
        plan: string;
        private: boolean;
        readyAt: EpochTimeStamp;
        readyState: string;
        readySubstate: string;
        target: string;
        teamId: string;
        type: string;
        url: string;
        userId: string;
        withCache: boolean;
    }[];
    link: {
        createdAt: EpochTimeStamp;
        deployHooks: unknown[];
        gitCredentialId: string;
        org: string;
        productionBranch: string;
        repo: string;
        repoId: number;
        repoOwnerId: number;
        sourceless: boolean;
        type: string;
        updatedAt: number;
    };
    live: boolean;
    name: string;
    nodeVersion: string;
    oidcTokenConfig: {
        enabled: boolean;
        issuerMode: string;
    };
    outputDirectory: string;
    productionDeploymentsFastLane: boolean;
    protectedSourcemaps: boolean;
    publicSource?: unknown;
    resourceConfig: {
        fluid: boolean;
        functionDefaultRegions: string[];
    };
    rootDirectory?: unknown;
    sourceFilesOutsideRootDirectory: boolean;
    speedInsights: {
        canceledAt: EpochTimeStamp;
        disabledAt: EpochTimeStamp;
        enabledAt: EpochTimeStamp;
        hasData: boolean;
        id: string;
    };
    ssoProtection: {
        deploymentType: string;
    };
    targets: {
        production: {
            alias: string[];
            aliasAssigned: EpochTimeStamp;
            aliasError?: unknown;
            automaticAliases: string[];
            buildingAt: EpochTimeStamp;
            builds: unknown[];
            createdAt: EpochTimeStamp;
            createdIn: string;
            creator: VercelProjectCreator;
            deploymentHostname: string;
            forced: boolean;
            id: string;
            meta: VercelProjectMeta;
            name: string;
            oidcTokenClaims: VercelOidcTokenClaims;
            plan: string;
            private: boolean;
            readyAt: EpochTimeStamp;
            readyState: string;
            readySubstate: string;
            target: string;
            teamId: string;
            type: string;
            url: string;
            userId: string;
            withCache: boolean;
        };
    };
    updatedAt: EpochTimeStamp;
    webAnalytics?: {
        enabledAt: EpochTimeStamp;
        id: string;
    };
};

type VercelProjectMeta = {
    branchAlias: string;
    githubCommitAuthorEmail: string;
    githubCommitAuthorLogin: string;
    githubCommitAuthorName: string;
    githubCommitMessage: string;
    githubCommitOrg: string;
    githubCommitRef: string;
    githubCommitRepo: string;
    githubCommitRepoId: string;
    githubCommitSha: string;
    githubCommitVerification: string;
    githubDeployment: string;
    githubHost: string;
    githubOrg: string;
    githubRepo: string;
    githubRepoId: string;
    githubRepoOwnerType: string;
    githubRepoVisibility: string;
    lambdaRuntimeStats: string;
    repoPushedAt: string;
};

type VercelProjectCreator = {
    email: string;
    githubLogin: string;
    uid: string;
    username: string;
};

type VercelOidcTokenClaims = {
    aud: string;
    environment: string;
    iss: string;
    owner: string;
    owner_id: string;
    plan: string;
    project: string;
    project_id: string;
    scope: string;
    sub: string;
};