export interface AppNavigationAnchor {
	path: string
	name: string
}

export interface AppNavigationItem extends AppNavigationAnchor {
	anchors?: Array<AppNavigationAnchor>
}